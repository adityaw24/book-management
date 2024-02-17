import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { errorHandler } from "./responseHandler";

export function confirmDeletePopup(callbacks) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ff5861",
        cancelButtonColor: "#f2f2f2",
        confirmButtonText: "Yes, delete it!",
        reverseButtons: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        preConfirm: async () => {
            try {
                await callbacks.onConfirm();
            } catch (error) {
                errorHandler(error);
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            toast.success("Record has been deleted.");
            if (callbacks.onSuccess) callbacks?.onSuccess();
        }
    });
}
