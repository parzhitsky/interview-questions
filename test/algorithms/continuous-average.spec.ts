import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { TestCase } from "./test-case";

import continuousAverage, { InputArgs, Output } from "../../src/algorithms/continuous-average";

const testCases: TestCase<InputArgs, Output>[] = [
	{
		inputArgs: [
			[ 1, 1, 1, 1, 1 ],
		],
		output: 1,
	},
	{
		inputArgs: [
			[ 1, 1, 2, 5, 10 ],
		],
		output: 3.8,
	},
	{
		inputArgs: [
			[],
		],
		output: NaN,
	},
	{
		inputArgs: [
			[ 42, 17, 333, 0, Infinity, NaN ],
		],
		output: 98,
	},
];

describe("continuous-average: Continuously calculates average given numbers one at a time", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(continuousAverage(...inputArgs)).to.deep.equal(output);
		});
});
