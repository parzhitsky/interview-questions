import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { TestCase } from "./test-case";

import ternaryXor, { InputArgs, Output } from "../../src/algorithms/ternary-xor";

const testCases: TestCase<InputArgs, Output>[] = [
	{
		inputArgs: [ false, false, false ],
		output: false,
	},
	{
		inputArgs: [ false, false, true ],
		output: true,
	},
	{
		inputArgs: [ false, true, false ],
		output: true,
	},
	{
		inputArgs: [ false, true, true ],
		output: false,
	},
	{
		inputArgs: [ true, false, false ],
		output: true,
	},
	{
		inputArgs: [ true, false, true ],
		output: false,
	},
	{
		inputArgs: [ true, true, false ],
		output: false,
	},
	{
		inputArgs: [ true, true, true ],
		output: false,
	},
];

describe("ternary-xor: performs ternary XOR logic operation", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(ternaryXor(...inputArgs)).to.deep.equal(output);
		});
});
