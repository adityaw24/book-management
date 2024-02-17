import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json; charset=utf-8",
    },
});

export default axiosInstance;
