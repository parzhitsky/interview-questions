const { valuer } = require("@valuer/main");

const kebab = String(valuer(process.argv[2], "case name").as(/[a-z][-\w]*/i)).toLowerCase();

const files = [
	{
		filename: `./src/${ kebab }.ts`,
		contents: require("./assets/main-file-boilerplate")(kebab, process.argv[3]),
	},
	{
		filename: `./src/${ kebab }.spec.ts`,
		contents: require("./assets/test-file-boilerplate")(kebab),
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
