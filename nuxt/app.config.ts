export default defineAppConfig({
    ui: {
        colors: {
            highlight: 'red',
            primary: 'indigo',
            neutral: 'gray',
        },
        button: {
            slots: {
                base: 'uppercase font-semibold no-underline',
            },
        },
        navigationMenu: {
            slots: {
                label: 'text-[color:var(--ui-primary)] pr-4 pt-4 pb-2',
            },
        },
        prose: {
            // .prose pins --tw-prose-bold to gray-500, and Tailwind Typography's
            // strong rule reads that token, so bold text inside a callout came out
            // grey while the callout's own body kept its colour: two colours in one
            // sentence. Callout's theme already carries a [&_code]: rule for the same
            // class of problem, so this extends it the same way rather than adding a
            // stylesheet override. Applies to ::note, ::tip, ::warning and ::caution,
            // and so to the handbook's callouts too, which had the same mismatch.
            callout: {
                slots: {
                    base: '[&_strong]:text-inherit',
                },
            },
        },
    },
})
