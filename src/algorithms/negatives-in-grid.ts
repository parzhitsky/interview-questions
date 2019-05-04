/** @private */
type Grid = number[][];

export type InputArgs = [ Grid ];
export type Output = number;

/** in a given row-and-column-wise-sorted grid, finds total amount of negative numbers */
export default function negativesInGrid(...args: InputArgs): Output {
	const [ grid ] = args;

	let total = 0;

	for (const row of grid) {
		const negCount = row.findIndex((number) => number >= 0);

		if (negCount > 0)
			total += negCount;

		else break;
	}

	return total;
}
