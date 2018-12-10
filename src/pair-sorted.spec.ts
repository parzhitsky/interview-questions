import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import pairSorted from "./pair-sorted";

const inputArgsList: [ number[], number ][] = [
	[ [1, 2, 3, 5], 6 ],
	[ [1, 2, 3, 5], 8 ],
	[ [1, 2, 3, 5], 9 ],
];

const outputs: boolean[] = [
	true,
	true,
	false,
];

describe("pair-sorted", () => {
	inputArgsList.forEach((inputArgs, index) => {
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(outputs[index]) }`, () => {
			expect(pairSorted(...inputArgs)).to.equal(outputs[index]);
		});
	});
});
