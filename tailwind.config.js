const plugin = require('tailwindcss/plugin')

module.exports = {
    content: ['src/**/*.html','src/**/*.njk','src/**/*.md','src/**/*.svg','src/**/*.js','.eleventy.js'],
    safelist: [
      'ml-4',
      'ml-8',
      'ml-6',
      'mt-3',
      'max-w-[90%]',
      'py-4',
      'py-2',
      'bg-indigo-600',
      'text-white',
      'rounded-br-sm',
      'bg-gray-100',
      'text-gray-800',
      'rounded-bl-sm',
      'justify-end',
      'justify-start',
      'max-w-xs',
      'lg:max-w-md',
      'overflow-auto',
      'rounded-lg',
      'px-4',
      'mb-4',
      'flex',
      'hover:border-indigo-400',
      'hover:bg-indigo-50',
      'hover:bg-indigo-100',
      'active:bg-indigo-100',
      'active:border-indigo-500',
      'transition-all',
      'duration-200',
      'text-gray-600',
      'hover:text-indigo-600',
      'transition-colors'
    ],
    theme: {
        extend: {
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        '--tw-prose-headings': theme('colors.gray.600'),
                        picture: {
                            marginTop: '0',
                            marginBottom: '0',
                        },
                        h1: {
                            fontWeight: '500',
                        },
                        h2: {
                            fontWeight: '400',
                        },
                        h3: {
                            fontWeight: '400',
                        },
                        h4: {
                            fontWeight: '400',
                        },
                        h5: {
                            fontWeight: '400',
                        },
                        h6: {
                            fontWeight: '400',
                        },
                        code: {
                            color: theme('colors.red.700'),
                        },
                        strong: {
                            color: theme('colors.gray.500'),
                        },
                        maxWidth: '80ch',
                    },
                },
            }),
            fontSize: {
                'page-h1': ['2.4rem', '3rem'],
                'post-h4': ['1.25rem']
            },
            fontFamily: {
                'sans': ['Heebo', 'Helvetica', 'Arial', 'sans-serif'],
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
                    50: "#FFEFEA",
                    100: "#FFD9CE",
                    200: "#FFC5B3",
                    300: "#FFB29A",
                    400: "#ED4E4E",
                    500: "#EB6D46",
                    600: "#DA3D0B",
                    700: "#B33109",
                    800: "#8D2606",
                    900: "#671D06",
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
