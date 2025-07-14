module.exports = function(site) {
  return {
    "@type": "WebSite",
    "@id": "https://flowfuse.com/#website",
    "url": "https://flowfuse.com",
    "name": "FlowFuse",
    "description": site.messaging?.title || "FlowFuse",
    "publisher": {
      "@id": "https://flowfuse.com/#organization"
    }
  };
};