import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { getTestCases } from "./get-test-cases";

import heapSort from "../../../src/algorithms/sorting/heap-sort";

describe("heap-sort: sorts a given list of numbers using MaxHeap structure internally", () => {
	for (const { inputArgs, output } of getTestCases())
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(heapSort(...inputArgs)).to.deep.equal(output);
		});
});
