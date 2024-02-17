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
import { Button } from "../ui";

function DataTable({
    columns,
    data,
    totalData,
    pagination,
    onPaginationChange,
    isLoading,
}) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        onPaginationChange,
        pageCount: Math.round(totalData / pagination.pageSize),
        state: { pagination },
    });

    return (
        <>
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
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
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
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex items-center justify-end py-4 space-x-2">
                <Button
                    title="Prev"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    loading={isLoading}
                    className="btn-outline btn-sm"
                />
                <Button
                    title="Next"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    loading={isLoading}
                    className="btn-outline btn-sm"
                />
            </div>
        </>
    );
}

export default DataTable;
