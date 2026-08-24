module.exports = function (eleventyConfig) {
  // Files that should be copied to the final site untouched.
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("static");

  // Simple date filter used in templates if needed later.
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // Returns only the artwork entries belonging to a given category slug.
  eleventyConfig.addFilter("byCategory", (artwork, slug) =>
    (artwork || []).filter((piece) => piece.category === slug)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
