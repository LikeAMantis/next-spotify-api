const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')
const nestedGroups = require("tailwindcss-nested-groups")

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                gray: colors.gray
            },
            animation: {
                fadeIn: "fadeIn 500ms ease-out forwards"
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                }
            }

        },
    },
    plugins: [
        nestedGroups,
        require("tailwindcss-nested-groups"),
        // plugin(function ({ addVariant }) {
        //     addVariant('child', '& > *');
        //     // for (var i = 1; i <= 5; i++) {
        //     //     addVariant(`nth-${i}`, `&:nth-child(${i})`);
        //     // }
        // }),
    ]
}