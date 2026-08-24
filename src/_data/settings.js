const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

module.exports = () => {
  const file = path.join(__dirname, "../../content/settings.yml");
  const raw = fs.readFileSync(file, "utf8");
  return yaml.load(raw);
};
