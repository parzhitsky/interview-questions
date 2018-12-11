module.exports = (kebab = "kebab-case-identifier", descr = "", camel = require("camelcase")(kebab)) =>
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

describe("${ kebab }${ descr ? `: ${ descr }` : "" }", () => {
	if (testCases.length < 3)
		it("lacks proper test coverage");

	else for (const { inputArgs, output } of testCases)
		it(\`for (\${ help.getPrintableList(inputArgs, true) }) outputs \${ help.getPrintable(output) }\`, () => {
			expect(${ camel }(...inputArgs)).to.deep.equal(output);
		});
});
`;
