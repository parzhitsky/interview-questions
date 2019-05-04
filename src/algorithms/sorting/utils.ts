import { TestCase } from "../../test-case";

/** @private */
type List = number[];

/** @private */
type TestCase_ = TestCase<[ List ], List>;

export function* testCases() {
	yield <TestCase_> {
		inputArgs: [ [5, 4, 1, 2, 9] ],
		output: [ 1, 2, 4, 5, 9 ],
	};
	
	yield <TestCase_> {
		inputArgs: [ [3, 3, 3] ],
		output: [3, 3, 3],
	};
	
	yield <TestCase_> {
		inputArgs: [ [8, 7] ],
		output: [7, 8],
	};
	
	yield <TestCase_> {
		inputArgs: [ [5] ],
		output: [5],
	};
	
	yield <TestCase_> {
		inputArgs: [ [] ],
		output: [],
	};
}
