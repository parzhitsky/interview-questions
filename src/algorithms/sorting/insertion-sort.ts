/** sorts a given list of numbers using InsertionSort strategy */
export default function insertionSort(list: number[]): number[] {
	for (let current = 1; current < list.length; current++)
		for (let left = current - 1; left >= 0; left--)
			if (list[left] <= list[left + 1])
				break;

			else [ list[left], list[left + 1] ] = [ list[left + 1], list[left] ];

	return list;
}
