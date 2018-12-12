import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import adjacentTiles, { Grid, Color } from "./adjacent-tiles";

const [ R, G, B, Y ]: Color[] = [ 1, 2, 3, 4 ];

const testCases: {
	inputArgs: [ Grid ];
	output: number;
}[] = [
	{
		inputArgs: [
			/* grid: */ [
				/* row: */ []
			],
		],
		output: 0,
	},
	{
		inputArgs: [
			/* grid: */ [
				/* row: */ [ R, R, G ],
				/* row: */ [ R, R, G ],
			],
		],
		output: 4,
	},
	{
		inputArgs: [
			/* grid: */ [
				/* row: */ [ R, R, R, R, R, R ],
				/* row: */ [ G, G, G, B, B, B ],
			],
		],
		output: 6,
	},
	{
		inputArgs: [
			/* grid: */ [
				/* row: */ [ R, R, G, G, B ],
				/* row: */ [ G, B, B, B, B ],
				/* row: */ [ R, B, G, G, G ],
				/* row: */ [ G, B, G, G, G ],
			],
		],
		output: 7,
	},
	{
		inputArgs: [
			/* grid: */ [
				/* row: */ [ Y, G, Y, G, B, R, B ],
				/* row: */ [ B, R, Y, Y, B, Y, G ],
				/* row: */ [ R, R, B, R, G, Y, R ],
				/* row: */ [ G, Y, G, G, R, R, G ],
				/* row: */ [ B, Y, R, B, R, Y, B ],
			],
		],
		output: 7,
	},
];

describe("adjacent-tiles: on a given 2-dimensional grid, finds the biggest number of adjacent tiles of the same color", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(adjacentTiles(...inputArgs)).to.deep.equal(output);
		});
});
