import React, { forwardRef } from "react";
import mergeClass from "~/libs/mergeClass";

const Modal = (
    { className = "", children = null, onBackdropClick = () => {} },
    ref
) => {
    return (
        <dialog ref={ref} className={mergeClass("modal", className)}>
            <div className="modal-box">{children}</div>
            <form method="dialog" className="modal-backdrop">
                <button
                    type="button"
                    onClick={() => {
                        onBackdropClick && onBackdropClick();
                    }}
                >
                    close
                </button>
            </form>
        </dialog>
    );
};

const ModalTitle = ({ className = "" }) => {
    return (
        <h3 className={mergeClass("font-bold text-lg", className)}>Hello!</h3>
    );
};

const ModalHeader = ({ children = null, className = "" }) => {
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
};

const ModalBody = ({ children = null, className = "" }) => {
    return (
        <>
            <section className={mergeClass("py-4", className)}>
                {children}
            </section>
        </>
    );
};

const refForwardedModal = forwardRef(Modal);

export { ModalHeader, ModalBody, ModalTitle };

export default refForwardedModal;
