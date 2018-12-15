/** sorts a given list of numbers using BubbleSort technique */
export default function bubbleSort(list: number[]): number[] {
	const { length } = list;

	for (let end = 0; length - end > 1; end ++)
		for (let right = length - 1; right > end; right--)
			if (list[right - 1] > list[right])
				[ list[right - 1], list[right] ] = [ list[right], list[right - 1] ];

	return list;
}
