/** sorts a given list of numbers using SelectionSort strategy */
export default function selectionSort(list: number[]): number[] {
	if (list.length > 1)
		for (let left = 0; left < list.length; left++) {
			let min = left;

			for (let next = left + 1; next < list.length; next++)
				if (list[next] < list[min])
					min = next;

			[ list[left], list[min] ] = [ list[min], list[left] ];
		}

	return list;
}
