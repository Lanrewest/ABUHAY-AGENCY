/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif']
            },
            colors: {
                primary: {
                    DEFAULT: '#1A237E', // deep blue
                    light: '#3949AB',
                    dark: '#0D1333',
                },
                gold: {
                    DEFAULT: '#FFD700',
                    light: '#FFECB3',
                    dark: '#BFA100',
                },
                cream: {
                    DEFAULT: '#FFF8E1',
                },
                accent: {
                    DEFAULT: '#00B8A9',
                    light: '#5EEAD4',
                    dark: '#00796B',
                },
                dark: {
                    DEFAULT: '#22223B',
                },
            },
        },
    },
    plugins: [],
}