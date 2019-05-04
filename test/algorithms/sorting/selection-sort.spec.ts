import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { getTestCases } from "./get-test-cases";

import selectionSort from "../../../src/algorithms/sorting/selection-sort";

describe("selection-sort: sorts a given list of numbers using SelectionSort strategy", () => {
	for (const { inputArgs, output } of getTestCases())
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(selectionSort(...inputArgs)).to.deep.equal(output);
		});
});
