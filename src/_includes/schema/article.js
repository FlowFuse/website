module.exports = function(data) {
  const { meta, page, authors, team, site } = data;
  
  // Get title and description directly from data (frontmatter)
  const title = data.title;
  const description = data.description;
  
  // Build author array with proper structured data
  const authorArray = authors?.map(authorId => {
    const author = team[authorId];
    if (!author) return null;
    
    const personSchema = {
      "@type": "Person",
      "name": author.name
    };
    
    // Add bio/description if available
    if (author.bio) {
      personSchema.description = author.bio;
    }
    
    // Always add social media profiles with full URLs
    const sameAs = [];
    if (author.github) {
      sameAs.push(`https://github.com/${author.github}`);
    }
    if (author.linkedin) {
      sameAs.push(`https://linkedin.com/in/${author.linkedin}`);
    }
    if (sameAs.length > 0) {
      personSchema.sameAs = sameAs;
    }
    
    if (author.email) {
      personSchema.email = author.email;
    }
    
    if (author.title) {
      personSchema.jobTitle = author.title;
    }
    
    if (author.headshot) {
      personSchema.image = `https://flowfuse.com/images/team/headshot-${author.headshot}`;
    }
    
    return personSchema;
  }).filter(Boolean);
  
  // Build the article schema
  const articleSchema = {
    "@type": "BlogPosting",
    "@id": `https://flowfuse.com${page.url}#article`,
    "headline": title || "",
    "description": description || "",
    "url": `https://flowfuse.com${page.url}`,
    "datePublished": page.date || data.date || new Date().toISOString(),
    "dateModified": data.lastUpdated || page.date || data.date || new Date().toISOString(),
    "author": authorArray && authorArray.length > 0 ? (authorArray.length > 1 ? authorArray : authorArray[0]) : {
      "@type": "Person",
      "name": "FlowFuse Team"
    },
    "publisher": {
      "@id": "https://flowfuse.com/#organization"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://flowfuse.com${page.url}`
    },
    "isPartOf": {
      "@id": "https://flowfuse.com/#website"
    }
  };
  
  // Add image if available - Google recommends multiple aspect ratios
  if (data.image) {
    // Ensure image URL starts with /
    const imageUrl = data.image.startsWith('/') ? data.image : `/${data.image}`;
    const baseUrl = `https://flowfuse.com${imageUrl}`;
    
    // Provide multiple aspect ratios as recommended by Google
    articleSchema.image = [
      {
        "@type": "ImageObject",
        "url": baseUrl,
        "width": 1200,
        "height": 1200  // 1:1 aspect ratio
      },
      {
        "@type": "ImageObject", 
        "url": baseUrl,
        "width": 1200,
        "height": 900   // 4:3 aspect ratio
      },
      {
        "@type": "ImageObject",
        "url": baseUrl,
        "width": 1200,
        "height": 675   // 16:9 aspect ratio
      }
    ];
  } else {
    // Default image with multiple aspect ratios
    const defaultUrl = "https://flowfuse.com/images/og-blog.jpg";
    articleSchema.image = [
      {
        "@type": "ImageObject",
        "url": defaultUrl,
        "width": 1200,
        "height": 1200
      },
      {
        "@type": "ImageObject",
        "url": defaultUrl,
        "width": 1200,
        "height": 900
      },
      {
        "@type": "ImageObject",
        "url": defaultUrl,
        "width": 1200,
        "height": 675
      }
    ];
  }
  
  // Add keywords from frontmatter or tags
  if (data.keywords) {
    // If keywords are provided as a string in frontmatter
    articleSchema.keywords = data.keywords;
  } else if (data.tags && data.tags.length > 0) {
    // Fall back to tags
    const keywords = data.tags.filter(tag => tag !== 'posts' && tag !== 'post');
    if (keywords.length > 0) {
      articleSchema.keywords = keywords.join(', ');
    }
  }
  
  // Add article section if available
  if (data.category) {
    articleSchema.articleSection = data.category;
  }
  
  // Add article body using description (full content not available in template context)
  if (description) {
    articleSchema.articleBody = description;
    // Note: wordCount removed as we don't have access to full article content here
  }
  
  // Add subtitle if available
  if (data.subtitle) {
    articleSchema.alternativeHeadline = data.subtitle;
  }
  
  return articleSchema;
};
