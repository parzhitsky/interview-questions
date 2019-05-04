import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { getTestCases } from "./get-test-cases";

import insertionSort from "../../../src/algorithms/sorting/insertion-sort";

describe("insertion-sort: sorts a given list of numbers using InsertionSort strategy", () => {
	for (const { inputArgs, output } of getTestCases())
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(insertionSort(...inputArgs)).to.deep.equal(output);
		});
});
