/** @private */
function helper(input: string, length: number): number {
	if (!length)
		return 1;

	const start = input.length - length;

	if (input[start] === "0")
		return 0;

	let result = helper(input, length - 1);

	if (length >= 2 && +input.substr(start, 2) <= 26)
		result += helper(input, length - 2);

	return result;
}

export type InputArgs = [ string ];
export type Output = number;

/** calculates number of ways the input might be parsed, given the map of number-to-letter pairs */
export default function digitsParsedWays(...args: InputArgs): Output {
	const [ input ] = args;

	return helper(input, input.length);
}
