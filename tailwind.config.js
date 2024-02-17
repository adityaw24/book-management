/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/theming/themes")["light"],
                    primary: "#9333ea",
                },
            },
            {
                dark: {
                    ...require("daisyui/src/theming/themes")["dark"],
                    primary: "#9333ea",
                    "base-100": "#1f2937",
                },
            },
        ],
    },
};
