#!/usr/bin/env node
const { existsSync: exists } = require("fs");
const { red } = require("chalk");
const { valuer } = require("@valuer/main");
const read = require("./read");
const write = require("./write");

const etype = valuer(process.argv[2], "entity type").as([ "algorithm", "structure" ]);
const ename = valuer(process.argv[3], "entity name").as(/^[a-z][-a-z]*$/);

const filename = `${ etype }s/${ ename }`;

const files = {
	"src": ".ts",
	"test": ".spec.ts",
};

for (const dir in files) {
	const extention = files[dir];
	const filepath = `./${ dir }/${ filename + extention }`;

	if (exists(filepath))
		console.warn(red(`[WARN]: File "${ filepath }" already exists!`));

	else {
		write(filepath, read(`./scripts/assets/${ dir }.ts.template`, etype, ename));

		console.log(`[INFO]: File "${ filepath }" has been created`);
	}
}
