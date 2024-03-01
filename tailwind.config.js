const plugin = require('tailwindcss/plugin')

module.exports = {
    content: ['src/**/*.html','src/**/*.njk','src/**/*.md','src/**/*.svg','.eleventy.js'],
    theme: {
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                  css: {
                    picture: {
                      marginTop: '0',
                      marginBottom: '0',
                    },
                  },
                },
            }),
            fontSize: {
                'page-h1': ['2.5rem', '3.5rem'],
                'post-h4': ['1.25rem']
            },
            fontFamily: {
                'sans': ['Helvetica', 'Arial', 'sans-serif'],
            },
            textShadow: {
                header: '1px 1px 0.25rem black'
            },
            boxShadow: {
                nav: '0px 10px 20px #11182766;'
            },
            gridTemplateColumns: {
                header: '1fr auto 1fr'
            },
            transitionProperty: {
                'height': 'max-height',
                'spacing': 'margin, padding',
                'navdropdown': 'max-height, margin, padding'
            },
            colors: { // https://coolors.co/aa4444-2d2d2a-779fa1-efd09e-fafac6
                current: 'currentColor',
                black: "#000",
                white: "#FFF",
                gray: {
                    50: "#F9FAFB",
                    100: "#F3F4F6",
                    200: "#E5E7EB",
                    300: "#D1D5DB",
                    400: "#9CA3AF",
                    500: "#6B7280",
                    600: "#4B5563",
                    700: "#374151",
                    800: "#1F2937",
                    900: "#111827"
                },
                red: {
                    50: "#FFEBEB",
                    100: "#FFC6C6",
                    200: "#FF8D8D",
                    300: "#F16F6F",
                    400: "#ED4E4E",
                    500: "#D12B2B",
                    "500B": "#D82525",
                    600: "#BC3838",
                    700: "#AB1818",
                    800: "#8F0001",
                    900: "#760000",
                },
                teal: {
                    50: "#E4FBFC",
                    100: "#C4F3F5",
                    200: "#B2EBEE",
                    300: "#8CE2E7",
                    400: "#74D4D9",
                    500: "#50C3C9",
                    600: "#35AAB0",
                    700: "#31959A",
                    800: "#397B7E",
                    900: "#406466"
                }
            }
        }
    },
    plugins: [
        // require('postcss-import'),
        require('@tailwindcss/typography'),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
              {
                'text-shadow': (value) => ({
                  textShadow: value,
                }),
              },
              { values: theme('textShadow') }
            )
          }),
    ]
}
