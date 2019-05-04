import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { TestCase } from "./test-case";

import arrayDigitsIncrease, { InputArgs, Output } from "../../src/algorithms/array-digits-increase";

const testCases: TestCase<InputArgs, Output>[] = [
	{
		inputArgs: [ [] ],
		output: [],
	},
	{
		inputArgs: [ [1,3,5] ],
		output: [1,3,6],
	},
	{
		inputArgs: [ [5,7,9] ],
		output: [5,8,0],
	},
	{
		inputArgs: [ [9,9,9] ],
		output: [1,0,0,0],
	},
];

describe("array-digits-increase: increases a number represented by an array of digits by one", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(arrayDigitsIncrease(...inputArgs)).to.deep.equal(output);
		});
});
