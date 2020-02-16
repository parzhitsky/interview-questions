const { writeFileSync } = require("fs");

/** @private */
const options = { encoding: "utf8" };

/**
 * @param {string} path
 * @param {any} data
 */
module.exports = (path, data) => writeFileSync(path, data, options);
