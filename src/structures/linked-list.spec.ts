import "mocha";
import { expect } from "chai";

import LinkedList from "./linked-list";

describe("linked-list: defines a list of values, each of which points to the next one (if any)", () => {
	const list = new LinkedList(1, 2, 3, 4, 5);

	it("supports appending elements", () => {
		list.append(6);

		expect([ ...list.values() ]).to.deep.equal([ 1, 2, 3, 4, 5, 6 ]);
	});

	it("supports prepending elements", () => {
		list.prepend(7);

		expect([ ...list.values() ]).to.deep.equal([ 7, 1, 2, 3, 4, 5, 6 ]);
	});

	it("supports removing elements", () => {
		list.remove(3);

		expect([ ...list.values() ]).to.deep.equal([ 7, 1, 2, 4, 5, 6 ]);
	});

	it("has readable size", () => {
		expect(list.size).to.equal(6);
	});
});
