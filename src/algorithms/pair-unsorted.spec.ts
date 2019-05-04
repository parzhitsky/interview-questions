import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { TestCase } from "../test-case";

import pairUnsorted, { InputArgs, Output } from "./pair-unsorted";

const testCases: TestCase<InputArgs, Output>[] = [
	{
		inputArgs: [ [1, 2, 3, 4], 8 ],
		output: false,
	},
	{
		inputArgs: [ [4, 6, 1, 2], 8 ],
		output: true,
	},
	{
		inputArgs: [ [5, 2, 4, 7, 8, 2], 11 ],
		output: true,
	},
];

describe("pair-unsorted: checks whether there is a pair of numbers in a given unsorted list, which sum is equal to a given sum", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(pairUnsorted(...inputArgs)).to.deep.equal(output);
		});
});
