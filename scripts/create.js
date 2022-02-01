#!/usr/bin/env node
const { existsSync: exists } = require("fs");
const { resolve } = require("path");
const { valuer } = require("@valuer/main");
const { warn, info } = require("./log");
const read = require("./read");
const write = require("./write");

const etype = valuer(process.argv[2], "entity type").as([ "algorithm", "structure" ]);
const ename = valuer(process.argv[3], "entity name").as(/^[a-z][-a-z]*$/);

const codeTypes = [
	{
		dir: "src",
		ext: ".ts",
	},
	{
		dir: "test",
		ext: ".spec.ts",
	},
];

for (const { dir, ext } of codeTypes) {
	const templatePath = resolve(__dirname, "assets", `${etype}.${dir}.template`);
	const codeFilePath = resolve(__dirname, "..", dir, `${etype}s/${ename + ext}`);

	if (!exists(templatePath))
		warn(`No "${dir}" template found for "${etype}" files!`);

	else if (exists(codeFilePath))
		warn(`File already exists: "${codeFilePath}"`);

	else {
		const content = read(templatePath, etype, ename);

		write(codeFilePath, content);
		info(`Wrote file: "${codeFilePath}"`);
	}
}
