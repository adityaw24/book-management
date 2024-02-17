import { useRef } from "react";
import Modal from "~/component/ui/Modal";

export const useModal = ({
    onModalOpen = () => {},
    onModalClose = () => {},
    shouldAllowBackdropClick = true,
    children = null,
    className = "",
}) => {
    const ref = useRef(null);

    const closeModal = () => {
        onModalClose && onModalClose();
        ref.current?.close();
    };

    const openModal = () => {
        onModalOpen && onModalOpen();
        ref.current?.showModal();
    };

    const modal = (
        <Modal
            onBackdropClick={() => {
                if (shouldAllowBackdropClick) {
                    closeModal();
                }
            }}
            ref={ref}
            className={className}
        >
            {children}
        </Modal>
    );

    return {
        closeModal,
        openModal,
        modal,
    };
};
