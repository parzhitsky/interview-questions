import "mocha";
import { expect } from "chai";
import { help } from "@valuer/help";

import groupBy from "./group-by";

interface Person {
	name: string;
	age: number;
}

const testCases: {
	inputArgs: [ any[], (x: any) => any ];
	output: Record<string, any>;
}[] = [
	{
		inputArgs: [
			[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ],
			(x: number) => x % 2 == 0,
		],
		output: {
			true: [ 2, 4, 6, 8, 10 ],
			false: [ 1, 3, 5, 7, 9 ],
		},
	},

	{
		inputArgs: [
			[ "ant", "buffalo", "cat", "dingo", "rhino" ],
			(x: string) => x.length,
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
				{ name: "Alice", age: 37 },
				{ name: "Alice", age: 19 },
				{ name: "Daniel", age: 20 },
				{ name: "Bob", age: 62 },
				{ name: "Bob", age: 16 },
				{ name: "Bob", age: 47 },
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
			"Bob": [
				{ name: "Bob", age: 62 },
				{ name: "Bob", age: 16 },
				{ name: "Bob", age: 47 },
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
