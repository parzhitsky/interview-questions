import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { TestCase } from "./test-case";

import digitsParsedWays, { InputArgs, Output } from "../../src/algorithms/digits-parsed-ways";

const testCases: TestCase<InputArgs, Output>[] = [
	{
		inputArgs: [ "22222" ],
		output: 8,
	},
	{
		inputArgs: [ "12345" ],
		output: 3,
	},
	{
		inputArgs: [ "12340" ],
		output: 0,
	},
	{
		inputArgs: [ "98765" ],
		output: 1,
	},
	{
		inputArgs: [ "120" ],
		output: 1,
	},
];

describe("digits-parsed-ways: calculates number of ways the input might be parsed, given the map of number-to-letter pairs", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(digitsParsedWays(...inputArgs)).to.deep.equal(output);
		});
});
