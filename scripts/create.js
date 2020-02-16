#!/usr/bin/env node
const { existsSync: exists } = require("fs");
const camelcase = require("camelcase");
const { valuer } = require("@valuer/main");

const etype = valuer(process.argv[2], "entity type").as([ "algorithm", "structure" ]);
const kebab = valuer(process.argv[3], "entity name").as(/^[a-z][-a-z]*$/);
const descr = valuer(process.argv[4], "entity description").as("string");
const camel = camelcase(kebab);

const prepared = (
	/** @type {string} */
	contents,
) => contents
	.replace(/#\{ETYPE\}/g, etype)
	.replace(/#\{DESCR\}/g, descr)
	.replace(/#\{KEBAB\}/g, kebab)
	.replace(/#\{CAMEL\}/g, camel);

const files = [
	{
		filename: `./src/${ etype }s/${ kebab }.ts`,
		contents: prepared(require("./assets/main-file-boilerplate")),
	},
	{
		filename: `./test/${ etype }s/${ kebab }.spec.ts`,
		contents: prepared(require("./assets/test-file-boilerplate")),
	},
];

for (const { filename, contents } of files)
	if (exists(filename))
		console.warn(`[WARN]: File "${ filename }" already exists!`);

	else fs.writeFile(filename, contents, () => {
		console.warn(`[INFO]: File "${ filename }" has been created`);
	});
