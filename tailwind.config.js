const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
    purge: {
        content: [
            "./pages/**/*.{js,ts,jsx,tsx}",
            "./components/**/*.{js,ts,jsx,tsx}",
        ],
        safelist: ["bg-gray-600", "border-gray-400"],
    },
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", ...defaultTheme.fontFamily.sans],
                head: ["GeneralSans", ...defaultTheme.fontFamily.sans],
                code: ["Menlo", ...defaultTheme.fontFamily.sans],
            },
            inset: {
                "-4.5": "-18px",
            },
            colors: {
                radio: "#37F28D",
                blog: {
                    para: "#d1d5db",
                },
                brand: {
                    100: "#6DA5FF",
                    250: "#438BFF",
                    300: "#2F80FF",
                    350: "#2A72E5",
                    400: "#2565CC",
                    500: "#1C4C99",
                    600: "#173F7F",
                    700: "#123266",
                    800: "#0E264C",
                    900: "#091933",
                },
                gray: {
                    150: "#FFFFFF66",
                    650: "#5c5c6e",
                    100: "#B0C3DB",
                    200: "#8FA0B7",
                    300: "#657080",
                    400: "#303740",
                    500: "#1D232B",
                    550: "#11161f",
                    600: "#0B0F15",
                },
                dark: {
                    200: "#2B3139",
                    300: "#1B2028",
                    400: "#161B22",
                    500: "#0F141D",
                    600: "#0B0F15",
                },
            },
            width: {
                hero: "500px",
                heroDesc: "450px",
            },
        },
    },
    variants: {
        extend: {
            display: ["group-hover"],
        },
    },
}
