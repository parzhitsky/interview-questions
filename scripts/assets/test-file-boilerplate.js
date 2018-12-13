module.exports =
`import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import #{CAMEL} from "./#{KEBAB}";

const testCases: {
	inputArgs: [ unknown ]; // TODO: define
	output: unknown; // TODO: define
}[] = [
	// TODO: add
];

describe("#{KEBAB}: #{DESCR}", () => {
	if (testCases.length < 3)
		it("lacks proper test coverage");

	else for (const { inputArgs, output } of testCases)
		it(\`for (\${ help.getPrintableList(inputArgs, true) }) outputs \${ help.getPrintable(output) }\`, () => {
			expect(#{CAMEL}(...inputArgs)).to.deep.equal(output);
		});
});
`;
