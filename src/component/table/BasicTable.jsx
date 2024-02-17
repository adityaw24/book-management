import { forwardRef } from "react";
import mergeClass from "~/libs/mergeClass";

const TableComponent = ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
        <table
            ref={ref}
            className={mergeClass("w-full caption-bottom text-sm", className)}
            {...props}
        />
    </div>
);
const Table = forwardRef(TableComponent);
Table.displayName = "Table";

const TableHeaderComponent = ({ className, ...props }, ref) => (
    <thead
        ref={ref}
        className={mergeClass("[&_tr]:border-b", className)}
        {...props}
    />
);
const TableHeader = forwardRef(TableHeaderComponent);
TableHeader.displayName = "TableHeader";

const TableBodyComponent = ({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={mergeClass("[&_tr:last-child]:border-0", className)}
        {...props}
    />
);
const TableBody = forwardRef(TableBodyComponent);
TableBody.displayName = "TableBody";

const TableFooterComponent = ({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={mergeClass(
            "border-t bg-base-200/50 font-medium [&>tr]:last:border-b-0",
            className
        )}
        {...props}
    />
);
const TableFooter = forwardRef(TableFooterComponent);
TableFooter.displayName = "TableFooter";

const TableRowComponent = ({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={mergeClass(
            "border-b dark:border-gray-700/50 transition-colors hover:bg-base-200/50 data-[state=selected]:bg-base-200",
            className
        )}
        {...props}
    />
);
const TableRow = forwardRef(TableRowComponent);
TableRow.displayName = "TableRow";

const TableHeadComponent = ({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={mergeClass(
            "h-10 px-2 text-left align-middle font-medium text-base-200-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
        )}
        {...props}
    />
);
const TableHead = forwardRef(TableHeadComponent);
TableHead.displayName = "TableHead";

const TableCellComponent = ({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={mergeClass(
            "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
            className
        )}
        {...props}
    />
);
const TableCell = forwardRef(TableCellComponent);
TableCell.displayName = "TableCell";

const TableCaptionComponent = ({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={mergeClass(
            "mt-4 text-sm text-base-200-foreground",
            className
        )}
        {...props}
    />
);
const TableCaption = forwardRef(TableCaptionComponent);
TableCaption.displayName = "TableCaption";

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
};
