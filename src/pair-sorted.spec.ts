import "mocha";
import { expect } from "chai";

import pairSorted from "./pair-sorted";

describe("pair-sorted", () => {
	it("checks whether there is a pair of numbers in a given sorted list, which sum is equal to a given sum", () => {
		expect(pairSorted([1, 2, 3, 5], 6)).to.be.true;
		expect(pairSorted([1, 2, 3, 5], 8)).to.be.true;
		expect(pairSorted([1, 2, 3, 5], 9)).to.be.false;
	});
});
