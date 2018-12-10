const { valuer } = require("@valuer/main");

const kebab = valuer(process.argv[2], "case name").as(/[a-z][-\w]*/i);
const camel = require("camelcase")(kebab);
const descr = process.argv[3];

const files = [
	{
		filename: `./src/${ kebab }.ts`,
		contents: (descr ? `/** ${ descr } */\n` : "") + `export default function ${ camel }() {\n\t// ...\n};\n`,
	},
	{
		filename: `./src/${ kebab }.spec.ts`,
		contents: require("./assets/test-file-boilerplate")(camel, kebab),
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
