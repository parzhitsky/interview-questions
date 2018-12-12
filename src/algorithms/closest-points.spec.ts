import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import closestPoints, { Point } from "./closest-points";

const testCases: {
	inputArgs: [ Point[], number ];
	output: Point[];
}[] = [
	{
		inputArgs: [ [], 10 ],
		output: [],
	},
	{
		inputArgs: [ [ [0,1], [1,0], [1,1], [2,2], [1,5], [7,9] ], 3 ],
		output: [ [ 1,1 ], [ 1,0 ], [ 0,1 ] ],
	},
	{
		inputArgs: [ [ [-1,0], [0,-2], [-2,-3], [3,2], [-2,4], [3,-5] ], 2 ],
		output: [ [0,-2], [-1,0] ],
	},
];

describe("closest-points: from a set of points, finds n closest ones to the origin", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(closestPoints(...inputArgs)).to.deep.equal(output);
		});
});
