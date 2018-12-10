import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import pairUnsorted from "./pair-unsorted";

const testCases: {
	inputArgs: [ number[], number ];
	output: boolean;
}[] = [
	{
		inputArgs: [ [1, 2, 3, 4], 8 ],
		output: false,
	},
	{
		inputArgs: [ [4, 6, 1, 2], 8 ],
		output: true,
	},
];

describe("pair-unsorted", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(pairUnsorted(...inputArgs)).to.deep.equal(output);
		});
});
