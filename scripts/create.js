const camelcase = require("camelcase");
const { valuer } = require("@valuer/main");
const { writeFile, exists: _exists } = require("fs");
const { promisify } = require("util");

const exists = promisify(_exists);

// ***

const kebab = valuer(process.argv[2], "case name").as(/[a-z][-\w]*/i);
const camel = camelcase(kebab);
const descr = process.argv[3];

const files = [
	{
		filename: `./src/${ kebab }.ts`,
		contents: (descr ? `/** ${ descr } */\n` : "") + `export default function ${ camel }() {\n\t// ...\n};\n`,
	},
	{
		filename: `./test/${ kebab }.spec.ts`,
		contents: `import "mocha";\nimport { expect } from "chai";\n\nimport ${ camel } from "../src/${ kebab }";\n\ndescribe("${ kebab }", () => {\n\tit("${ descr || "<no description>" }");\n});\n`,
	},
];

void async function main() {
	for (const { filename, contents } of files)
		if (await exists(filename))
			console.warn(`[WARN]: File "${ filename }" already exists!`);

		else writeFile(filename, contents, () => {
			console.warn(`[INFO]: File "${ filename }" has been created`);
		});
}();
