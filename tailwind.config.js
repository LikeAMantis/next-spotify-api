const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            textColor: {
                secondary: "var(--text-secondary)",
            },
            borderColor: {
                default: "var(--border-gray-default)",
            }
        },
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant('child', '& > *');
            addVariant('rev', '> &');
            for (var i = 1; i <= 5; i++) {
                addVariant(`nth-${i}`, `&:nth-child(${i})`);
            }
        }),
    ]
}