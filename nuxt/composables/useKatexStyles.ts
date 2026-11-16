// KaTeX's stylesheet, for the pages that render markdown through <ContentRenderer>.
// remark-math + rehype-katex (nuxt.config.ts) turn `$...$` in content into KaTeX
// markup, and only those pages can contain it. It used to be a global <link> in
// app.head, which made every page (the homepage included) wait on a render-blocking
// request to jsDelivr for CSS it never used. Called from each markdown page's setup,
// so it still lands in that page's prerendered <head> and math never renders unstyled.
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
