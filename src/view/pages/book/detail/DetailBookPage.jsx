"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Button, Card, LoadingDots, PageTitle } from "~/component/ui";
import { useRouter } from "next/navigation";
import { bookGetDetailRequest } from "~/service/book-service";
import moment from "moment";
import { errorHandler } from "~/libs/responseHandler";

const DetailBookPage = ({ bookId = "" }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [detailBook, setDetailBook] = useState(null);

    const router = useRouter();

    const getDetailBook = async () => {
        try {
            setIsLoading(true);
            const resPost = await bookGetDetailRequest(bookId);
            setDetailBook(resPost);
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getDetailBook();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookId]);

    return (
        <section className="grid h-full grid-cols-1 gap-6 lg:grid-cols lg:flex-row">
            <Card className="h-full lg:h-[80vh] overflow-auto">
                <Card.Header>
                    <Card.Title title={detailBook?.title} />
                    <LoadingDots label="Please wait..." isLoading={isLoading} />
                </Card.Header>
                <div className="grid grid-col-1 lg:grid-cols-6 gap-4">
                    <div className="flex flex-row justify-between items-start">
                        <p className="m-0">Description</p>
                        <span>:</span>
                    </div>
                    <p className="m-0 col-span-5">{detailBook?.description}</p>

                    <div className="flex flex-row justify-between items-start">
                        <p className="m-0">Excerpt</p>
                        <span>:</span>
                    </div>
                    <p className="m-0 col-span-5">{detailBook?.excerpt}</p>

                    <div className="flex flex-row justify-between items-start">
                        <p className="m-0">Total Page</p>
                        <span>:</span>
                    </div>
                    <p className="m-0 col-span-5">{detailBook?.pageCount}</p>

                    <div className="flex flex-row justify-between items-start">
                        <p className="m-0">Publish Date</p>
                        <span>:</span>
                    </div>
                    <p className="m-0 col-span-5">
                        {moment(detailBook?.publishDate).format("LL")}
                    </p>
                </div>
            </Card>
        </section>
    );
};

export default DetailBookPage;
