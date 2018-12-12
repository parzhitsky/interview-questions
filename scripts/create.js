const { valuer } = require("@valuer/main");

const kebab = String(valuer(process.argv[2], "entity name").as(/^[a-z][-a-z]*$/i)).toLowerCase();
const descr = valuer(process.argv[3], "entity description").as("string");

const files = [
	{
		filename: `./src/${ kebab }.ts`,
		contents: require("./assets/main-file-boilerplate")(kebab, descr),
	},
	{
		filename: `./src/${ kebab }.spec.ts`,
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
