const { isAbsolute } = require("path");

class PathNotAbsoluteError extends global.Error {
	/**
	 * @param {string} path
	 */
	static assert(path) {
		if (!isAbsolute(path))
			throw new this(path);
	}

	/**
	 * @param {string} path
	 */
	constructor(path) {
		super(`Expected absolute path, got: "${path}"`);
	}
}

module.exports = PathNotAbsoluteError
