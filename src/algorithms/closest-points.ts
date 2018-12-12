import MaxHeap from "../structures/max-heap";

export type Point = [ number, number ];

/** from a set of points, finds n closest ones to the origin */
export default function closestPoints(points: Point[], count: number): Point[] {
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
};
