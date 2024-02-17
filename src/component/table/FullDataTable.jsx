"use client";
import { useEffect, useMemo, useState } from "react";

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./BasicTable";

import { useDebounce, useDebouncedCallback } from "use-debounce";
import { SelectInput, TextInput } from "../form";
import { Button } from "../ui";

function FullDataTable({
    data,
    columns,
    isLoading,
    totalData,
    refreshTrigger = undefined,
    getTableData,
    totalPage = undefined,
    placeholderSearch = "",
    search = false,
    clientSidePagination = false,
    sizePage = false,
    paginationSection = false,
    classnameTableBody = "",
}) {
    // pagination logic ================
    const [pagination, setPagination] = useState({
        pageSize: 10,
        pageIndex: 0,
    });

    const { pageSize, pageIndex } = pagination;
    const [debouncedPageIndex] = useDebounce(pageIndex, 500);

    const currentPage = useMemo(() => pageIndex + 1, [pageIndex]);
    const pageSkip = useMemo(() => pageSize * pageIndex, [pageSize, pageIndex]);
    const pageFirstRow = useMemo(() => pageSkip + 1, [pageSkip]);
    const pageLastRow = useMemo(
        () => pageSkip + pageSize,
        [pageSkip, pageSize]
    );
    const countPage = useMemo(
        () => Math.round(totalData / pageSize),
        [totalData, pageSize]
    );
    const pageCount = totalPage ?? countPage;

    const handleChangePageSize = (e) => {
        table.setPageSize(Number(e.target.value));
    };

    const handleChangePageIndex = (e) => {
        const pageToIndex = Number(e.target.value) - 1;
        table.setPageIndex(pageToIndex);
    };

    // search state =================
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue] = useDebounce(searchValue, 500);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    // datatable initialization ==================
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),

        manualPagination: true,
        state: { pagination },
        pageCount,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    });

    const paginatedData = () => {
        if (clientSidePagination) {
            return table
                .getRowModel()
                .rows?.splice(currentPage, pagination.pageSize);
        } else {
            return table.getRowModel().rows;
        }
    };

    const previousPage = () => {
        if (currentPage === 1) return;
        if (clientSidePagination) {
            const pageToIndex = currentPage - 1;
            return table.setPageIndex(pageToIndex);
        }
        table.previousPage();
    };

    const nextPage = () => {
        if (clientSidePagination) {
            const pageToIndex = currentPage + 1;
            return table.setPageIndex(pageToIndex);
        }
        table.nextPage();
    };

    // call get table data callback, triggered on every state change ================
    useEffect(() => {
        getTableData({
            pageSize,
            pageSkip,
            pageIndex: debouncedPageIndex,
            searchValue: debouncedSearchValue,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshTrigger, pageSize, debouncedPageIndex, debouncedSearchValue]);

    return (
        <>
            {(sizePage || search) && (
                <section className="flex items-center justify-between">
                    {sizePage && (
                        <div className="flex items-center gap-2">
                            <span>Page size :</span>

                            <SelectInput
                                options={[
                                    { value: "10", label: "10" },
                                    { value: "25", label: "25" },
                                    { value: "50", label: "50" },
                                    { value: "100", label: "100" },
                                ]}
                                value={pagination.pageSize.toString()}
                                onChange={handleChangePageSize}
                                disabled={isLoading}
                                className="w-auto"
                                inputClass="select-sm"
                            />
                        </div>
                    )}

                    {search && (
                        <div className="flex items-center gap-2">
                            <span>Search :</span>

                            <TextInput
                                className="w-auto"
                                inputClass="input-sm"
                                value={searchValue}
                                placeholder={placeholderSearch}
                                onChange={handleSearch}
                            />
                        </div>
                    )}
                </section>
            )}

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const receivedSize = header.column.getSize();
                                const colWidth =
                                    receivedSize != 150
                                        ? receivedSize
                                        : undefined; // 150 default size
                                return (
                                    <TableHead key={header.id} width={colWidth}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className={classnameTableBody}>
                    {paginatedData().length ? (
                        paginatedData().map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                {isLoading ? "Loading Data..." : "No results."}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {paginationSection && (
                <section className="flex items-center justify-between py-4">
                    {/* <span className="text-sm">
                    Showing {pageFirstRow} to {pageLastRow}
                </span> */}
                    <span className="text-sm">
                        Showing {pageFirstRow} to {pageLastRow}
                        {(totalData || totalData != 0) &&
                            `of ${totalData} entries`}
                    </span>

                    <div className="flex items-center gap-2">
                        <Button
                            // Icon={ChevronLeft}
                            title="Prev"
                            onClick={() => previousPage()}
                            disabled={!table.getCanPreviousPage() || isLoading}
                            className="btn-outline btn-sm"
                        />
                        {/* <span className="text-gray-500/50">|</span> */}

                        <TextInput
                            type="number"
                            value={currentPage}
                            onChange={handleChangePageIndex}
                            min={1}
                            max={pageCount}
                            disabled={isLoading}
                            className="w-20"
                            inputClass="input-sm"
                        />

                        {/* <span className="text-gray-500/50">|</span> */}
                        <Button
                            // Icon={ChevronRight}
                            title="Next"
                            onClick={() => nextPage()}
                            disabled={!table.getCanNextPage() || isLoading}
                            className="btn-outline btn-sm"
                        />
                    </div>
                </section>
            )}
        </>
    );
}

export default FullDataTable;
