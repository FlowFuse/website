module.exports = {
    meta: {
        title: (data) => {
            const title = data.title || data.meta?.title || data.page.fileSlug
            if (title) {
                return title[0].toUpperCase() + title.substring(1)
            } else {
                return title
            }
        }
    },
    people: (data) => {
        return {...data.team, ...data.guests}
    },
    lastUpdated: (data) => {
        // Ensure lastUpdated is a Date object if it exists
        if (data.lastUpdated && !(data.lastUpdated instanceof Date)) {
            return new Date(data.lastUpdated)
        }
        return data.lastUpdated
    },
    date: (data) => {
        // Ensure date is a Date object if it exists
        if (data.date && !(data.date instanceof Date)) {
            return new Date(data.date)
        }
        return data.date
    }
}
