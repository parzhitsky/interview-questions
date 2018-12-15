/** @private */
interface TestCase {
	inputArgs: [ number[] ];
	output: number[];
}

export function* testCases() {
	yield <TestCase> {
		inputArgs: [ [5, 4, 1, 2, 9] ],
		output: [ 1, 2, 4, 5, 9 ],
	};

	yield <TestCase> {
		inputArgs: [ [3, 3, 3] ],
		output: [3, 3, 3],
	};

	yield <TestCase> {
		inputArgs: [ [8, 7] ],
		output: [7, 8],
	};

	yield <TestCase> {
		inputArgs: [ [5] ],
		output: [5],
	};

	yield <TestCase> {
		inputArgs: [ [] ],
		output: [],
	};
}

