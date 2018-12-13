import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import firstRecurringCharacter from "./first-recurring-character";

const testCases: {
	inputArgs: [ string ];
	output: string;
}[] = [
	{
		inputArgs: [ "ABCAC" ],
		output: "A",
	},
	{
		inputArgs: [ "ABBA" ],
		output: "B",
	},
	{
		inputArgs: [ "cbac" ],
		output: "c",
	},
	{
		inputArgs: [ "ABC" ],
		output: "",
	},
	{
		inputArgs: [ "" ],
		output: "",
	},
];

describe("first-recurring-character: in a given string, finds the first recurring character", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(firstRecurringCharacter(...inputArgs)).to.deep.equal(output);
		});
});
