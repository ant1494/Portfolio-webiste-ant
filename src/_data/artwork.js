const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

module.exports = () => {
  const dir = path.join(__dirname, "../../content/artwork");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".yml"));

  const artwork = files.map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    return yaml.load(raw);
  });

  // Group by category order, then by each piece's own order.
  artwork.sort((a, b) => (a.order || 0) - (b.order || 0));
  return artwork;
};
