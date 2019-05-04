import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { TestCase } from "../test-case";

import pairSorted, { InputArgs, Output } from "./pair-sorted";

const testCases: TestCase<InputArgs, Output>[] = [
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

describe("pair-sorted: checks whether there is a pair of numbers in a given sorted list, which sum is equal to a given sum", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(pairSorted(...inputArgs)).to.deep.equal(output);
		});
});
