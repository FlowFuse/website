const articleSchema = require('./article');
const organizationSchema = require('./organization');
const websiteSchema = require('./website');
const breadcrumbSchema = require('./breadcrumb');

module.exports = function generateSchema(data) {
  // Ensure data object exists
  if (!data) return null;
  
  const { type, page, site } = data;
  const schemas = [];
  
  // Always include organization schema if site data exists
  if (site) {
    schemas.push(organizationSchema(site));
  }
  
  // Include website schema on homepage
  if (page && page.url === '/' && site) {
    schemas.push(websiteSchema(site));
  }
  
  // Include breadcrumb schema (except on homepage)
  if (page) {
    const breadcrumb = breadcrumbSchema(page);
    if (breadcrumb) {
      schemas.push(breadcrumb);
    }
  }
  
  // Include article schema for blog posts
  if (type === 'post' && data.authors) {
    // The frontmatter data is directly on the data object
    const articleData = {
      ...data,
      title: data.title,
      description: data.description,
      image: data.image,
      tags: data.tags,
      category: data.category
    };
    schemas.push(articleSchema(articleData));
  }
  
  // Return null if no schemas to add
  if (schemas.length === 0) return null;
  
  // Return single schema or @graph for multiple
  if (schemas.length === 1) {
    return {
      "@context": "https://schema.org",
      ...schemas[0]
    };
  }
  
  return {
    "@context": "https://schema.org",
    "@graph": schemas
  };
};