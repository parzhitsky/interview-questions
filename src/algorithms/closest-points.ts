import MaxHeap from "../structures/max-heap";

/** @private */
type Point = [ number, number ];

export type InputArgs = [ Point[], number ];
export type Output = Point[];

/** from a set of points, finds n closest ones to the origin */
export default function closestPoints(...args: InputArgs): Output {
	const [ points, count ] = args;

	const pointsEvaluable = points.map((point) => ({
		point,
		valueOf: () => Math.sqrt(point[0] ** 2 + point[1] ** 2),
	}));

	const heap = new MaxHeap<typeof pointsEvaluable[number]>();

	for (const point of pointsEvaluable.slice(0, count))
		heap.add(point);

	for (const point of pointsEvaluable.slice(count))
		if (point < heap.max!)
			heap.max = point;

	return heap.toArray().map(({ point }) => point);
}
