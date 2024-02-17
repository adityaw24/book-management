import toast from "react-hot-toast";

export function errorHandler(err) {
    // if (import.meta.env.DEV) console.log(err);

    const msg =
        err?.response?.data?.message ||
        err?.toString() ||
        "Something went wrong :(";

    toast.error(msg, {
        duration: 5000,
    });
}

export function successHandler(text) {
    // if (import.meta.env.DEV) console.log(err);

    const msg = text?.toString() || "Success !";

    toast.success(msg, {
        duration: 5000,
    });
}
