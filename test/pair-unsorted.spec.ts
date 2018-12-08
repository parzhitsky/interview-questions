import "mocha";
import { expect } from "chai";

import pairUnsorted from "../src/pair-unsorted";

describe("pair-unsorted", () => {
	it("checks whether there is a pair of numbers in a given unsorted list, which sum is equal to a given sum", () => {
		expect(pairUnsorted([ 1, 2, 3, 4 ], 8)).to.be.false;
		expect(pairUnsorted([ 4, 6, 1, 2 ], 8)).to.be.true;
	});
});
