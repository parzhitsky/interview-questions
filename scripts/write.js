const { writeFileSync } = require("fs");
const PathNotAbsoluteError = require("./path-not-absolute-error");

/** @private */
const options = { encoding: "utf8" };

/**
 * @param {string} path
 * @param {any} data
 */
module.exports = (path, data) => {
	PathNotAbsoluteError.assert(path);
	writeFileSync(path, data, options);
};
