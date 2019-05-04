export type InputArgs = [ number[], number ];
export type Output = boolean;

/** checks whether there is a pair of numbers in a given sorted list, which sum is equal to a given sum */
export default function pairSorted(...args: InputArgs): Output {
	const [ list, sum ] = args;

	const indexes: [ number, number ] = [
		0,
		list.length - 1,
	];

	while (indexes[0] < indexes[1]) {
		const currentSum = list[indexes[0]] + list[indexes[1]];

		if (currentSum > sum)
			indexes[1]--;

		else if (currentSum < sum)
			indexes[0]++;

		else return true;
	}

	return false;
}
