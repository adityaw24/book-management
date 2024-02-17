import { create } from "zustand";

const token = process.env.TOKEN || "";

const initialState = {
    user: {
        id: "",
        name: "",
        email: "",
        gender: "",
        status: "",
    },
    token: "",
};

const getInitialState = () => {
    let savedToken;
    let savedUser;
    if (typeof window !== "undefined") {
        savedUser = localStorage.getItem("user") || "";
        savedToken = localStorage.getItem("token") || token;
    }

    const initialStateCopy = { ...initialState };

    if (savedToken) {
        initialStateCopy.user = JSON.parse(savedUser);
        initialStateCopy.token = savedToken;
        return initialStateCopy;
    }
    return initialStateCopy;
};

const authStore = (set) => ({
    ...getInitialState(),
    setUser: (newUser) => {
        localStorage.setItem("user", JSON.stringify(newUser));
        set(() => ({ user: newUser }));
    },
    setToken: (newToken) => {
        localStorage.setItem("token", newToken);
        set(() => ({ token: newToken }));
    },
    resetState: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        set({ ...initialState });
    },
});

export const useAuthStore = create(authStore);
