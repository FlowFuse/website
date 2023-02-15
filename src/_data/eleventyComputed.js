module.exports = {
    meta: {
        title: (data) => {
            const title = data.title || data.meta?.title || data.page.fileSlug
            if (title) {
                console.log(title[0].toUpperCase() + title.substring(1))
                return title[0].toUpperCase() + title.substring(1)
            } else {
                return title
            }
        }
    }
}