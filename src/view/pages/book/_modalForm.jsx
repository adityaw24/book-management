"use client";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import Modal, { ModalBody } from "~/component/ui/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, SelectInput, TextInput, TextareaInput } from "~/component";
import { bookCreateRequest, bookUpdateRequest } from "~/service/book-service";
import moment from "moment";
import { errorHandler, successHandler } from "~/libs/responseHandler";

// /**@param {User} dataUser */
const ModalForm = ({
    onClose = () => {},
    dataBook = null,
    triggerRefresh = () => {},
}) => {
    const [isSubmit, setIsSubmit] = useState(false);

    const {
        register,
        formState: { errors, isSubmitting },
        reset,
        handleSubmit,
        setValue,
        getValues,
    } = useForm({
        defaultValues: {
            title: dataBook?.title || "",
            description: dataBook?.description || "",
            excerpt: dataBook?.excerpt || "",
            publishDate: dataBook?.publishDate || moment(),
            pageCount: dataBook?.pageCount || 0,
        },
        resolver: yupResolver(
            yup.object().shape({
                title: yup.string().required("Title is required"),
                description: yup.string().required("Description is required"),
                excerpt: yup.string().required("Excerpt is required"),
                publishDate: yup.string().required("Publish Date is required"),
                pageCount: yup.number().required("Total Page is required"),
            })
        ),
        reValidateMode: "onChange",
    });

    useEffect(() => {
        setValue("title", dataBook?.title || "");
        setValue("description", dataBook?.description || "");
        setValue("excerpt", dataBook?.excerpt || "");
        setValue(
            "publishDate",
            moment(dataBook?.publishDate).format("YYYY-MM-DD") || ""
        );
        setValue("pageCount", dataBook?.pageCount || 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataBook]);

    const onSubmit = async () => {
        try {
            setIsSubmit(true);

            /**@type {BookFormData} payload */
            const payload = {
                title: getValues("title"),
                description: getValues("description"),
                excerpt: getValues("excerpt"),
                pageCount: getValues("pageCount"),
                publishDate: getValues("publishDate"),
            };

            if (dataBook) {
                await bookUpdateRequest(dataBook?.id, payload);
                successHandler(`Success update ${payload.title}`);
            } else {
                await bookCreateRequest(payload);
                successHandler(`Success add ${payload.title}`);
            }

            triggerRefresh();

            reset();
            onClose();
        } catch (error) {
            errorHandler(error);
        } finally {
            setIsSubmit(false);
        }
    };

    return (
        <ModalBody>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <TextInput
                    {...register("title")}
                    label="Title"
                    placeholder="Enter title"
                    error={errors.title?.message}
                />
                <TextareaInput
                    {...register("description")}
                    label="Description"
                    placeholder="Enter description"
                    error={errors.description?.message}
                />
                <TextareaInput
                    {...register("excerpt")}
                    label="Excerpt"
                    placeholder="Enter excerpt"
                    error={errors.excerpt?.message}
                />
                <TextInput
                    {...register("pageCount")}
                    label="Total Page"
                    placeholder="Enter pageCount"
                    type="number"
                    min={0}
                    error={errors.pageCount?.message}
                />
                <TextInput
                    {...register("publishDate")}
                    label="Publish Date"
                    placeholder="Enter publishDate"
                    type="date"
                    error={errors.publishDate?.message}
                />
                <div className="flex flex-row items-center justify-end gap-6">
                    <Button
                        title="Cancel"
                        type="button"
                        className="mt-4 btn-neutral"
                        onClick={onClose}
                    />
                    <Button
                        title="Submit"
                        className="mt-4 btn-primary"
                        loading={isSubmit}
                    />
                </div>
            </form>
        </ModalBody>
    );
};

export default ModalForm;
