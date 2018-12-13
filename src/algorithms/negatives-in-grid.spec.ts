import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import negativesInGrid, { Grid } from "./negatives-in-grid";

const testCases: {
	inputArgs: [ Grid ];
	output: number;
}[] = [
	{
		inputArgs: [
			/* grid: */ [
				/* row: */ [-3, -2, -1, 1],
				/* row: */ [-2, 2, 3, 4],
				/* row: */ [4, 5, 7, 8],
			],
		],
		output: 4,
	},
	{
		inputArgs: [
			/* grid: */ [
				/* row: */ [-8, -7, -5, 1],
				/* row: */ [-5, -4, 0, 3],
				/* row: */ [-3, -1, 2, 5],
			],
		],
		output: 7,
	},
	{
		inputArgs: [
			/* grid: */ [
				/* row: */ [],
			],
		],
		output: 0,
	},
];

describe("negatives-in-grid: in a given row-and-column-wise-sorted grid, finds total amount of negative numbers", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(negativesInGrid(...inputArgs)).to.deep.equal(output);
		});
});
