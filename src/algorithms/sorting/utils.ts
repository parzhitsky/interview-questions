export const testCases: {
	inputArgs: [ number[] ];
	output: number[];
}[] = [
	{
		inputArgs: [ [5, 4, 1, 2, 9] ],
		output: [ 1, 2, 4, 5, 9 ],
	},
	{
		inputArgs: [ [3, 3, 3] ],
		output: [3, 3, 3],
	},
	{
		inputArgs: [ [8, 7] ],
		output: [7, 8],
	},
	{
		inputArgs: [ [5] ],
		output: [5],
	},
	{
		inputArgs: [ [] ],
		output: [],
	},
];
