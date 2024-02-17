import axiosInstance from "~/libs/api";

const pathUrl = "/Books";

export const bookGetRequest = async () => {
    const res = await axiosInstance.get(pathUrl);
    return res;
};

export const bookGetDetailRequest = async (bookId) => {
    const res = await axiosInstance.get(`${pathUrl}/${bookId}`);
    return res.data;
};

export const bookDeleteRequest = async (bookId) => {
    const res = await axiosInstance.delete(`${pathUrl}/${bookId}`);
    return res.data;
};

// /**@param {UserFormData} formData */
export const bookCreateRequest = async (formData) => {
    const res = await axiosInstance.post(pathUrl, formData);
    return res.data;
};

// /**@param {UserFormData} formData */
export const bookUpdateRequest = async (bookId, formData) => {
    const res = await axiosInstance.put(`${pathUrl}/${bookId}`, formData);
    return res.data;
};
