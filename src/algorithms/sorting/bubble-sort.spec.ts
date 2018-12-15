import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { testCases } from "./utils";

import bubbleSort from "./bubble-sort";

describe("bubble-sort: sort a given list of numbers using BubbleSort technique", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(bubbleSort(...inputArgs)).to.deep.equal(output);
		});
});
