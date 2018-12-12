const { valuer } = require("@valuer/main");

const etype = valuer(process.argv[2], "entity type").as([ "algorithm", "structure" ]);
const kebab = String(valuer(process.argv[3], "entity name").as(/^[a-z][-a-z]*$/i)).toLowerCase();
const descr = valuer(process.argv[4], "entity description").as("string");

const files = [
	{
		filename: `./src/${ etype }s/${ kebab }.ts`,
		contents: require("./assets/main-file-boilerplate")(kebab, descr),
	},
	{
		filename: `./src/${ etype }s/${ kebab }.spec.ts`,
		contents: require("./assets/test-file-boilerplate")(kebab, descr),
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
