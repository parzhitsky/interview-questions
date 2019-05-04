import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { getTestCases } from "./get-test-cases";

import bubbleSort from "../../../src/algorithms/sorting/bubble-sort";

describe("bubble-sort: sort a given list of numbers using BubbleSort technique", () => {
	for (const { inputArgs, output } of getTestCases())
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(bubbleSort(...inputArgs)).to.deep.equal(output);
		});
});
