import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { testCases } from "./utils";

import heapSort from "./heap-sort";

describe("heap-sort: sorts a given list of numbers using MaxHeap structure internally", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(heapSort(...inputArgs)).to.deep.equal(output);
		});
});
