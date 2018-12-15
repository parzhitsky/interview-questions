import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { testCases } from "./utils";

import insertionSort from "./insertion-sort";

describe("insertion-sort: sorts a given list of numbers using InsertionSort strategy", () => {
	for (const { inputArgs, output } of testCases())
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(insertionSort(...inputArgs)).to.deep.equal(output);
		});
});
