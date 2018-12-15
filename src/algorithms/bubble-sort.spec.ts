import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import bubbleSort from "./bubble-sort";

const testCases: {
	inputArgs: [ number[] ];
	output: number[];
}[] = [
	{
		inputArgs: [ [5, 4, 1, 2, 9] ],
		output: [ 1, 2, 4, 5, 9 ],
	},
	{
		inputArgs: [ [3, 3, 3] ],
		output: [3, 3, 3],
	},
	{
		inputArgs: [ [8, 7] ],
		output: [7, 8],
	},
	{
		inputArgs: [ [5] ],
		output: [5],
	},
	{
		inputArgs: [ [] ],
		output: [],
	},
];

describe("bubble-sort: sort a given list of numbers using BubbleSort technique", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(bubbleSort(...inputArgs)).to.deep.equal(output);
		});
});
