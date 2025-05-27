module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
    theme: {
        extend: {},
    },
    plugins: [
        function ({ addUtilities }) {
            addUtilities({
                '.mask-fade-x': {
                    WebkitMaskImage:
                        'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                    maskImage:
                        'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                },
            });
        },
    ],
};
