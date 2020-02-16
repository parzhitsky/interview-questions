const { readFileSync } = require("fs");
const camel = require("camelcase");
const { valuer } = require("@valuer/main");

/** @private */
const TSIGNORE = /(?<=\n|^).*?@ts-ignore\s*?\n/g;

/** @private */
const ETYPE = /\$ETYPE\$/g;

/** @private */
const ENAME = /\$ENAME\$/g;

/** @private */
const CAMEL = /\$CAMEL\$/g;

/** @private */
const DESCR = /\$DESCR\$/g;

/**
 * @param {string} path
 * @param {string} etype
 * @param {string} ename
 */
module.exports = (path, etype, ename) => readFileSync(path, "utf8")
	.replace(TSIGNORE, "")
	.replace(ETYPE, etype)
	.replace(ENAME, ename)
	.replace(CAMEL, camel(ename))
	.replace(DESCR, valuer(process.argv[4], "entity description").as("string"))
	;
