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
    },
})
