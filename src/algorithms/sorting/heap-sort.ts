import MaxHeap from "../../structures/max-heap";

/** sorts a given list of numbers using `MaxHeap` structure internally */
export default function heapSort(list: number[]): number[] {
	const heap = new MaxHeap(...list);

	while (heap.size > 0) {
		list[heap.size - 1] = heap.max!;

		heap.max = null;
	}

	return list;
}
