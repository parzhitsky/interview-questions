module.exports = (camel = "camelCaseIdentifier", kebab = "kebab-case-identifier") =>
`import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import ${ camel } from "./${ kebab }";

// ***

type InputArgs = [ unknown ]; // TODO: set type
type Output = unknown; // TODO: set type

const inputArgsList: InputArgs[] = [
	// TODO: add
];

const outputs: Output[] = [
	// TODO: add
];

// ***

describe("${ kebab }", () => {
	it("is covered with tests", () => {
		expect(inputArgsList.length).to.not.equal(0);
		expect(inputArgsList.length).to.equal(outputs.length);
	});

	inputArgsList.forEach((inputArgs, index) => {
		it(\`for (\${ help.getPrintableList(inputArgs, true) }) outputs \${ help.getPrintable(outputs[index]) }\`, () => {
			expect(${ camel }(...inputArgs)).to.equal(outputs[index]);
		});
	});
});
`;
