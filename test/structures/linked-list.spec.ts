import "mocha";
import { expect } from "chai";

import LinkedList from "../../src/structures/linked-list";

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

	it("supports removing single element", () => {
		list.remove((value) => value === 3);

		expect([ ...list.values() ]).to.deep.equal([ 7, 1, 2, 4, 5, 6 ]);
	});

	it("has readable size", () => {
		expect(list.size).to.equal(6);
	});

	it("supports removing all the elements", () => {
		list.clear();

		expect(list.size).to.equal(0);
	});

	it("supports removing several elements", () => {
		const n = 16;
		const lists: LinkedList<number>[] = [
			new LinkedList(n, n, 1, 2),
			new LinkedList(n, 1, n, 2),
			new LinkedList(1, n, n, 2),
			new LinkedList(1, n, 2, n),
			new LinkedList(1, 2, n, n),
			new LinkedList(n, 1, 2, n),
			new LinkedList(n, n),
			new LinkedList(1, 2),
			new LinkedList(),
		];

		for (const list_ of lists) {
			list_.removeAll((value) => value === n);

			expect([ ...list_.values() ]).to.not.contain(n);
		}
	});
});
