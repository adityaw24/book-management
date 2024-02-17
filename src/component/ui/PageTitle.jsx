function PageTitle({ title }) {
    return (
        <h2 className="mt-10 mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            <slot>{title}</slot>
        </h2>
    );
}

export default PageTitle;
