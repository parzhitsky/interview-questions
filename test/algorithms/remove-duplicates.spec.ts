import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { TestCase } from "./test-case";

import removeDuplicates, { InputArgs, Output } from "../../src/algorithms/remove-duplicates";

const obj = { prop: 42 };

const testCases: TestCase<InputArgs, Output>[] = [
	{
		inputArgs: [ [ 1, 2, 3, obj ] ],
		output: [ 1, 2, 3, obj ],
	},
	{
		inputArgs: [ [ 4, 4, 5 ] ],
		output: [ 4, 5 ],
	},
	{
		inputArgs: [ [ 6, 7, obj, { prop: 42 } ] ],
		output: [ 6, 7, obj, { prop: 42 } ],
	}
];

describe("remove-duplicates: mutates a given list of items by removing all duplicates", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(removeDuplicates(...inputArgs)).to.deep.equal(output);
		});
});
