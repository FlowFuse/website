module.exports = function(page) {
  // Skip breadcrumbs for homepage or if page object is invalid
  if (!page || !page.url || page.url === '/') return null;
  
  const parts = page.url.split('/').filter(Boolean);
  let currentPath = '';
  
  const itemListElement = parts.map((part, index) => {
    currentPath += `/${part}`;
    
    // Capitalize first letter and replace hyphens with spaces
    const name = part
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return {
      "@type": "ListItem",
      "position": index + 1,
      "name": name,
      "item": `https://flowfuse.com${currentPath}/`
    };
  });
  
  // Add homepage as first item
  itemListElement.unshift({
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://flowfuse.com/"
  });
  
  // Adjust positions
  itemListElement.forEach((item, index) => {
    item.position = index + 1;
  });
  
  return {
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };
};