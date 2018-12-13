import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import firstNonRecurringCharacter from "./first-non-recurring-character";

const testCases: {
	inputArgs: [ string ];
	output: string;
}[] = [
	{
		inputArgs: [ "ABC" ],
		output: "A",
	},
	{
		inputArgs: [ "B" ],
		output: "B",
	},
	{
		inputArgs: [ "ECGAAG" ],
		output: "E",
	},
	{
		inputArgs: [ "ABBA" ],
		output: "",
	},
	{
		inputArgs: [ "" ],
		output: "",
	},
];

describe("first-non-recurring-character: in a given string, find the first character, that occurs only once", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(firstNonRecurringCharacter(...inputArgs)).to.deep.equal(output);
		});
});
