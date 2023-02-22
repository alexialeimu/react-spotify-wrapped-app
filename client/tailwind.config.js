/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        // fontFamily: {
        //     sans: ['Poppins', 'ui-sans-serif'],
        //     serif: ['Libre Baskerville', 'ui-serif'],
        // },
        extend: {
            colors: {
                black: '#191414',
                lightGray: '#C5C5C5',
                greenDark: '#1db954',
                green: '#1ed760',
            },
        },
    },
    plugins: [],
};
