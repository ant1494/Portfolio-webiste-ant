module.exports = function (eleventyConfig) {
	
	const fs = require("fs");
	const path = require("path");
	
	eleventyConfig.addShortcode("inlineSvg", function (filename) {
	const filePath = path.join(__dirname, "static/images/footer-icons", filename);
	let svg = fs.readFileSync(filePath, "utf8");
	svg = svg.replace(/<\?xml[^>]*\?>\s*/, "");
	// Auto-swap any hardcoded color in the file for currentColor,
	// so you never have to hand-edit fill/stroke values yourself.
	svg = svg.replace(/fill="(?!none)[^"]*"/gi, 'fill="currentColor"');
	svg = svg.replace(/stroke="(?!none)[^"]*"/gi, 'stroke="currentColor"');
	return svg;
	});
	
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

  // The lightbox reads image paths out of raw JSON blobs (see the
  // gallery-data <script> tags), which bypasses the `url` filter used
  // everywhere else. This applies the same path-prefixing to those paths
  // before they're serialized, so lightbox images resolve correctly too.
  eleventyConfig.addFilter("withPrefixedImages", function (items) {
    const prefix = (process.env.ELEVENTY_PATH_PREFIX || "/").replace(/\/$/, "");
    const prefixPath = (p) => (p && p.startsWith("/") ? prefix + p : p);
    return (items || []).map((item) => {
      const copy = Object.assign({}, item);
      if (copy.image) copy.image = prefixPath(copy.image);
      if (copy.gallery) {
        copy.gallery = copy.gallery.map((g) => Object.assign({}, g, { image: prefixPath(g.image) }));
      }
      return copy;
    });
  });

  return {
    pathPrefix: process.env.ELEVENTY_PATH_PREFIX || "/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
