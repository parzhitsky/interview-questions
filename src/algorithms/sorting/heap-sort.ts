import MaxHeap from "../../structures/max-heap";

/** sorts a given list of numbers using MaxHeap structure internally */
export default function heapSort(input: number[]): number[] {
	const heap = new MaxHeap(...input);

	while (heap.size > 0) {
		input[heap.size - 1] = heap.max!;

		heap.max = null;
	}

	return input;
}
