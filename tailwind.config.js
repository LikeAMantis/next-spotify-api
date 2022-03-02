const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                fadeIn: "fadeIn 500ms ease-out forwards",
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
            },
        },
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant("child", "& > *");
        }),
        // Animation
        plugin(function ({ matchUtilities, theme, addUtilities }) {
            // duration
            matchUtilities(
                {
                    "animate-duration": (value) => ({
                        "animation-duration": value,
                    }),
                },
                { values: theme("transitionDuration") }
            );
            // direction
            matchUtilities(
                {
                    "animate-direction": (value) => ({
                        "animation-direction": value,
                    }),
                },
                {
                    values: {
                        normal: "normal",
                        backwards: "backwards",
                        alternate: "alternate",
                    },
                }
            );
            // timing function
            matchUtilities(
                {
                    "animate-timing": (value) => ({
                        "animation-timing-function": value,
                    }),
                },
                {
                    values: {
                        ease: "ease",
                        easeIn: "ease-in",
                        easeOut: "ease-out",
                        linear: "linear",
                    },
                }
            );
            // iteration-count
            matchUtilities(
                {
                    "animate-iteration": (value) => ({
                        "animation-iteration-count": value,
                    }),
                },
                {
                    values: {
                        1: "1",
                        2: "2",
                        infinite: "infinite",
                    },
                }
            );
        }),
    ],
};
