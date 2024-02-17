import React from "react";
import { DetailBookPage } from "~/view/pages";

const DetailPage = ({ params }) => {
    const { idBook } = params;
    return <DetailBookPage bookId={idBook} />;
};

export default DetailPage;
