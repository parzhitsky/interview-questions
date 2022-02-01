#!/usr/bin/env node
const { existsSync: exists, writeFileSync: write } = require("fs");
const { resolve } = require("path");
const { valuer } = require("@valuer/main");
const { warn, info } = require("./log");
const { default: cloneTemplate, TemplateNotFoundError } = require("./clone-template");

const etype = valuer(process.argv[2], "entity type").as([ "algorithm", "structure" ]);
const ename = valuer(process.argv[3], "entity name").as(/^[a-z][-a-z]*$/);
const descr = valuer(process.argv[4], "entity description").as("string");

const substitutions = {
	entityType: String(etype),
	entityName: String(ename),
	description: String(descr),
};

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
	const { entityType, entityName } = substitutions;
	const codeFilePath = resolve(__dirname, "..", dir, `${entityType}s/${entityName + ext}`);

	if (exists(codeFilePath))
		warn(`File already exists: "${codeFilePath}"`);

	else
		try {
			const contents = cloneTemplate(entityType, dir, substitutions);
			write(codeFilePath, contents, "utf8");
			info(`Wrote file: "${codeFilePath}"`);
		} catch (caught) {
			if (caught instanceof TemplateNotFoundError)
				warn(caught.message);

			else
				throw caught;
		}
}
