import "mocha";
import { expect } from "chai";

import MaxHeap from "./max-heap";

describe("max-heap: describes binary heap structure with max value being made easy to retrieve", () => {
	const heap = new MaxHeap(1, 2, 3);

	it("from the set {1,2,3} recognizes 3 as the max value", () => {
		expect(heap.max).to.equal(3);
	});

	it("after adding 4, recognizes it instead as the max value", () => {
		heap.add(4);

		expect(heap.max).to.equal(4);
	});

	it("after adding 0, still recognizes 4 as the max value", () => {
		heap.add(0);

		expect(heap.max).to.equal(4);
	});

	it("after setting max to -1 directly, recognizes 3 again as the max value", () => {
		heap.max = -1;

		expect(heap.max).to.equal(3);
	});

	it ("is represented by the array [ 3, 1, 2, -1, 0 ]", () => {
		expect(heap.toArray()).to.deep.equal([ 3, 1, 2, -1, 0 ]);
	});
});
