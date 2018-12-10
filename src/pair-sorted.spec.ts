import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import pairSorted from "./pair-sorted";

const testCases: {
	inputArgs: [ number[], number ];
	output: boolean;
}[] = [
	{
		inputArgs: [ [1, 2, 3, 5], 6 ],
		output: true,
	},
	{
		inputArgs: [ [1, 2, 3, 5], 8 ],
		output: true,
	},
	{
		inputArgs: [ [1, 2, 3, 5], 9 ],
		output: false,
	},
];

describe("pair-sorted", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(pairSorted(...inputArgs)).to.deep.equal(output);
		});
});
