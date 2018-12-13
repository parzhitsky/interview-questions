#!/usr/bin/env node
const { valuer } = require("@valuer/main");

const etype = valuer(process.argv[2], "entity type").as([ "algorithm", "structure" ]);
const kebab = valuer(process.argv[3], "entity name").as(/^[a-z][-a-z]*$/);
const descr = valuer(process.argv[4], "entity description").as("string");
const camel = require("camelcase")(kebab);

const prepared = (
	/** @type {string} */
	contents,
) => contents
	.replace("#{DESCR}", descr)
	.replace("#{KEBAB}", kebab)
	.replace("#{CAMEL}", camel);

const files = [
	{
		filename: `./src/${ etype }s/${ kebab }.ts`,
		contents: prepared(require("./assets/main-file-boilerplate")),
	},
	{
		filename: `./src/${ etype }s/${ kebab }.spec.ts`,
		contents: prepared(require("./assets/test-file-boilerplate")),
	},
];

const fs = require("fs");
const exists = require("util").promisify(fs.exists);

void async function main() {
	for (const { filename, contents } of files)
		if (await exists(filename))
			console.warn(`[WARN]: File "${ filename }" already exists!`);

		else fs.writeFile(filename, contents, () => {
			console.warn(`[INFO]: File "${ filename }" has been created`);
		});
}();
