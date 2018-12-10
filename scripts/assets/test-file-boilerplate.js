module.exports = (kebab = "kebab-case-identifier", camel = require("camelcase")(kebab)) =>
`import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import ${ camel } from "./${ kebab }";

const testCases: {
	inputArgs: [ unknown ]; // TODO: define
	output: unknown; // TODO: define
}[] = [
	// TODO: add
];

describe("${ kebab }", () => {
	if (!testCases.length)
		it("lacks test coverage");

	else for (const { inputArgs, output } of testCases)
		it(\`for (\${ help.getPrintableList(inputArgs, true) }) outputs \${ help.getPrintable(output) }\`, () => {
			expect(${ camel }(...inputArgs)).to.equal(output);
		});
});
`;
