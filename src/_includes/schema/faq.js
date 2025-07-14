module.exports = function(data) {
  // Check if FAQ data exists (support both faq and meta.faq)
  const faqData = data.faq || data.meta?.faq;
  
  if (!faqData || !Array.isArray(faqData) || faqData.length === 0) {
    return null;
  }
  
  const faqSchema = {
    "@type": "FAQPage",
    "@id": `https://flowfuse.com${data.page.url}#faq`,
    "mainEntity": faqData.map((item, index) => ({
      "@type": "Question",
      "@id": `https://flowfuse.com${data.page.url}#faq-${index}`,
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };
  
  return faqSchema;
};