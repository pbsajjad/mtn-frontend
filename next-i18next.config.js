const path = require("path");

module.exports = {
  i18n: {
    locales: ["default", "fa", "en"],
    defaultLocale: "default",
    localeDetection: false,
    localePath: path.resolve("./public/locales"),
  },
};