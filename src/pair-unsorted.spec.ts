import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import pairUnsorted from "./pair-unsorted";

const inputArgsList: [ number[], number ][] = [
	[ [1, 2, 3, 4], 8 ],
	[ [4, 6, 1, 2], 8 ],
];

const outputs: boolean[] = [
	false,
	true,
];

describe("pair-unsorted", () => {
	inputArgsList.forEach((inputArgs, index) => {
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(outputs[index]) }`, () => {
			expect(pairUnsorted(...inputArgs)).to.equal(outputs[index]);
		});
	});
});
