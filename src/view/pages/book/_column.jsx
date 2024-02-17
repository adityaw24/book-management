import { Menu } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import { Button } from "~/component";

const _column = ({ handleDelete, handleUpdate }) => {
    const columns = [
        { accessorKey: "title", header: "Title" },
        {
            accessorKey: "publishDate",
            header: "Publish Date",
            cell: ({ row }) => (
                <div>
                    {moment(row.original.publishDate).format("YYYY-MM-DD")}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            size: 100,
            cell: ({ row }) => (
                <section className="dropdown dropdown-bottom dropdown-end">
                    <Button Icon={Menu} className="m-1 btn-accent btn-xs" />
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu p-2 shadow bg-neutral rounded-box w-52"
                    >
                        <li>
                            <Link href={`/book/${row.original.id}`}>
                                Detail
                            </Link>
                        </li>
                        <li>
                            <a onClick={handleUpdate(row.original)}>Edit</a>
                        </li>
                        <li>
                            <a onClick={handleDelete(row.original)}>Delete</a>
                        </li>
                    </ul>
                </section>
            ),
        },
    ];

    return columns;
};

export default _column;
