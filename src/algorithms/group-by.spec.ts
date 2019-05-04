import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";
import { TestCase } from "../test-case";

import groupBy, { InputArgs, Output } from "./group-by";

interface Person {
	name: string;
	age: number;
}

const testCases: TestCase<InputArgs, Output>[] = [
	{
		inputArgs: [
			[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
			(x: number) => String(x % 2 == 0),
		],
		output: {
			"true": [ 2, 4, 6, 8, 10 ],
			"false": [ 1, 3, 5, 7, 9 ],
		},
	},

	{
		inputArgs: [
			[ "ant", "buffalo", "cat", "dingo", "rhino" ],
			(x: string) => String(x.length),
		],
		output: {
			"3": [ "ant", "cat" ],
			"5": [ "dingo", "rhino" ],
			"7": [ "buffalo" ],
		},
	},

	{
		inputArgs: [
			<Person[]> [
				{ age: 16, name: "Gwen" },
				{ age: 19, name: "Alice" },
				{ age: 20, name: "Daniel" },
				{ age: 37, name: "Alice" },
				{ age: 47, name: "Gwen" },
				{ age: 62, name: "Gwen" },
			],
			(person: Person) => person.name,
		],
		output: {
			"Alice": [
				{ name: "Alice", age: 37 },
				{ name: "Alice", age: 19 },
			],
			"Daniel": [
				{ name: "Daniel", age: 20 },
			],
			"Gwen": [
				{ name: "Gwen", age: 62 },
				{ name: "Gwen", age: 16 },
				{ name: "Gwen", age: 47 },
			],
		}
	},
];

describe("group-by: Groups items in the list by a given grouper", () => {
	for (const { inputArgs, output } of testCases)
		it(`for (${ help.getPrintableList(inputArgs, true) }) outputs ${ help.getPrintable(output) }`, () => {
			expect(groupBy(...inputArgs)).to.deep.equal(output);
		});
});
