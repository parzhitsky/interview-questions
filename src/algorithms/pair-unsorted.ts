/** checks whether there is a pair of numbers in a given unsorted list, which sum is equal to a given sum */
export default function pairUnsorted(list: number[], sum: number): boolean {
	const compliments: number[] = [];

	for (const number of list)
		if (compliments.includes(sum - number))
			return true;

		else compliments.push(number);

	return false;
}
