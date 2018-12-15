import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { testCases } from "./utils";

import selectionSort from "./selection-sort";

describe("selection-sort: sorts a given list of numbers using SelectionSort strategy", () => {
	for (const { inputArgs, output } of testCases())
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(selectionSort(...inputArgs)).to.deep.equal(output);
		});
});
