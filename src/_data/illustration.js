const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

module.exports = () => {
  const dir = path.join(__dirname, "../../content/illustration");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".yml"));
  const items = files.map((file) => yaml.load(fs.readFileSync(path.join(dir, file), "utf8")));
  items.sort((a, b) => (a.order || 0) - (b.order || 0));
  return items;
};
