export function useKatexStyles () {
    useHead({
        link: [{
            key: 'katex-css',
            rel: 'stylesheet',
            href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
            integrity: 'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
            crossorigin: 'anonymous',
        }],
    })
}
