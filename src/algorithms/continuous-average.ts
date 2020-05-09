export type InputArgs = [ number[] ];
export type Output = number;

/** Continuously calculates average given numbers one at a time */
export default function continuousAverage(...args: InputArgs): Output {
	const [ numbers ] = args;

	let result = 0;
	let count = 0;

	for (const number of numbers)
		if (isFinite(number))
			result = ((result * count++) + number) / count;

	return count ? result : NaN;
}
