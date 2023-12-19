const should = require('should')
const xmljs = require('xml-js')
const fs = require('fs')
const path = require('path')

describe('Sitemap.xml', function () {
    it('should not contain URLs with capital letters', function () {
        const sitemapData = fs.readFileSync(path.join(__dirname, "../_site/sitemap.xml"), 'utf8')
        const sitemap = xmljs.xml2js(sitemapData, {compact: true, spaces: 4})
        const badURLs = sitemap.urlset.url.filter((url) =>
            url.loc._text !== url.loc._text.toLowerCase()
        )

        badURLs.should.be.empty()
    });
});