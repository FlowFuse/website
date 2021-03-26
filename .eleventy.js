module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy({ "src/images":"images"});

  return {
      dir: {
          input: "src"
      }
  }
};