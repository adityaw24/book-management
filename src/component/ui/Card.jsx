import mergeClass from "~/libs/mergeClass";

function Card({ className = "", children = null }) {
    return (
        <>
            <div
                className={mergeClass("card bg-base-100 shadow-xl", className)}
            >
                <div className="gap-3 card-body">{children}</div>
            </div>
        </>
    );
}

function CardHeader({ children, className = "" }) {
    return (
        <>
            <section
                className={mergeClass(
                    "flex items-center justify-between",
                    className
                )}
            >
                {children}
            </section>

            <hr className="mt-1 mb-4 dark:border-gray-600" />
        </>
    );
}

function CardTitle({ title, className = "" }) {
    return <h2 className={mergeClass("card-title", className)}>{title}</h2>;
}

Card.Header = CardHeader;
Card.Title = CardTitle;

export default Card;
