/** @private */
namespace MaxHeap {
	export interface Comparable {
		valueOf(): number | string;
	}

	export interface Item<Value extends Comparable = number> {
		value: Value;
	}

	export interface Coords {
		row: number;
		col: number;
	}
}

/** describes binary heap structure with max value being made easy to retrieve */
export default class MaxHeap<Value extends MaxHeap.Comparable = number> {
	private grid: MaxHeap.Item<Value>[][] = [];

	set max(value: Value | null) {
		if (value == null)
			return;

		this.grid[0][0] = { value };
		this.plumpDown({ row: 0, col: 0 });
	}

	get max(): Value | null {
		const item = this.getItem({ row: 0, col: 0 });

		return item && item.value;
	}

	// ***

	constructor(...values: Value[]) {
		for (const value of values)
			this.add(value);
	}

	add(value: Value): this {
		const item: MaxHeap.Item<Value> = { value };

		const nextRowIndex = this.grid.length - 1; // empty grid is allowed
		const nextRowCapacity = 2 ** nextRowIndex;
		const nextRow = this.grid[nextRowIndex];

		let row: number;
		let col: number;

		if (nextRow != null && nextRow.length < nextRowCapacity) {
			row = nextRowIndex;
			col = nextRow.push(item) - 1;
		}

		else {
			row = this.grid.push([ item ]) - 1;
			col = 0;
		}

		this.bubbleUp({ row, col });

		return this;
	}

	toArray(): Value[] {
		const values: Value[] = [];

		for (const row of this.grid)
			for (const { value } of row)
				values.push(value);

		return values;
	}

	// ***

	private swap(a: MaxHeap.Item<Value>, b: MaxHeap.Item<Value>) {
		[ a.value, b.value ] = [ b.value, a.value ];
	}

	private getItem({ row, col }: MaxHeap.Coords): MaxHeap.Item<Value> | null {
		return this.grid[row] ? this.grid[row][col] : null;
	}

	private getParentCoords(childCoords: MaxHeap.Coords): MaxHeap.Coords | null {
		if (childCoords.row === 0 || this.getItem(childCoords) == null)
			return null;

		return {
			row: childCoords.row - 1,
			col: Math.floor(childCoords.col / 2),
		};
	}

	private getChildrenCoords(parentCoords: MaxHeap.Coords): [ MaxHeap.Coords, MaxHeap.Coords ] | null {
		if (parentCoords.row === this.grid.length - 1 || this.getItem(parentCoords) == null)
			return null;

		const row = parentCoords.row + 1;
		const col = parentCoords.col * 2;

		return [
			{ row, col },
			{ row, col: col + 1 },
		];
	}

	private bubbleUp(childCoords: MaxHeap.Coords) {
		const parentCoords = this.getParentCoords(childCoords);

		if (!parentCoords)
			return;

		const child = this.getItem(childCoords)!;
		const parent = this.getItem(parentCoords);

		if (parent == null || child.value <= parent.value)
			return;

		this.swap(child, parent);
		this.bubbleUp(parentCoords);
	}

	private plumpDown(parentCoords: MaxHeap.Coords) {
		const childrenCoords = this.getChildrenCoords(parentCoords);

		if (!childrenCoords)
			return;

		const parent = this.getItem(parentCoords)!;

		for (const childCoords of childrenCoords) {
			const child = this.getItem(childCoords);

			if (child == null || child.value <= parent.value)
				continue;
	
			this.swap(parent, child);
			this.plumpDown(childCoords);

			break;
		}
	}
}
