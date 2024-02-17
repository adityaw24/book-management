"use client";
import React, { useState } from "react";
import FullDataTable from "~/component/table/FullDataTable";
import { Button, Card, LoadingDots, PageTitle } from "~/component/ui";
import _column from "./_column";
import { confirmDeletePopup } from "~/libs/popup";
import { LucidePlus } from "lucide-react";
import { useModal } from "~/hooks/useModal";
import ModalForm from "./_modalForm";
import { bookDeleteRequest, bookGetRequest } from "~/service/book-service";
import { errorHandler, successHandler } from "~/libs/responseHandler";

const BookPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [totalPage, setTotalPage] = useState(null);
    const [toggleRefresh, setToggleRefresh] = useState(false);
    const [dataBook, setDataBook] = useState(null);

    const { modal, closeModal, openModal } = useModal({
        children: (
            <ModalForm
                dataBook={dataBook}
                onClose={() => closeModal()}
                triggerRefresh={() => setToggleRefresh(!toggleRefresh)}
            />
        ),
    });

    const getTableData = async () => {
        try {
            setIsLoading(true);
            const res = await bookGetRequest();
            // console.log(res);

            setTableData(res.data);
            // setTotalData(res.headers["x-pagination-total"]);
            // setTotalPage(res.headers["x-pagination-pages"]);
        } catch (err) {
            errorHandler(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = (row) => () => {
        const deleteBook = async () => {
            try {
                await bookDeleteRequest(row.id);
                successHandler(`Success delete ${row.title}`);
            } catch (error) {
                errorHandler(error);
            }
        };

        confirmDeletePopup({
            onConfirm: () => deleteBook(),
            onSuccess: () => setToggleRefresh(!toggleRefresh),
        });
    };

    const handleUpdate = (row) => () => {
        setDataBook(row);
        openModal();
    };

    const tableColumns = _column({ handleDelete, handleUpdate });

    return (
        <>
            {/* <PageTitle title="User List" /> */}
            {modal}
            <Card>
                <Card.Header>
                    <Card.Title title="Book List" />
                    <LoadingDots label="Please wait..." isLoading={isLoading} />
                    <Button
                        title="Create New"
                        Icon={LucidePlus}
                        onClick={() => openModal()}
                        className="btn-primary btn-md"
                    />
                </Card.Header>
                <FullDataTable
                    data={tableData}
                    columns={tableColumns}
                    getTableData={getTableData}
                    totalData={totalData}
                    isLoading={isLoading}
                    totalPage={totalPage}
                    placeholderSearch="Search name"
                    refreshTrigger={toggleRefresh}
                    classnameTableBody="max-h-[80vh] overflow-auto"
                />
            </Card>
        </>
    );
};

export default BookPage;
