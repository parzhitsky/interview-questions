const { readFileSync } = require("fs");
const camel = require("camelcase");
const { valuer } = require("@valuer/main");

/** @private */
const ETYPE = /__ETYPE__/g;

/** @private */
const ENAME = /__ENAME__/g;

/** @private */
const CAMEL = /__CAMEL__/g;

/** @private */
const DESCR = /__DESCR__/g;

/**
 * @param {string} path
 * @param {string} etype
 * @param {string} ename
 */
module.exports = (path, etype, ename) => readFileSync(path, "utf8")
	.replace(ETYPE, etype)
	.replace(ENAME, ename)
	.replace(CAMEL, camel(ename))
	.replace(DESCR, valuer(process.argv[4], "entity description").as("string"))
	;
