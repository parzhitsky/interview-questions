/** @private */
interface Comparable {
	valueOf(): number | string;
}

/** @private */
interface Item<Value extends Comparable = number> {
	value: Value;
}

/** @private */
interface Coords {
	row: number;
	col: number;
}

/** describes binary heap structure with max value being made easy to retrieve */
export default class MaxHeap<Value extends Comparable = number> {
	private readonly grid: Item<Value>[][] = [[]];
	private readonly maxCoords: Coords = { row: 0, col: 0 };

	set max(value: Value | null) {
		if (value == null)
			return;

		this.grid[0][0] = { value };
		this.sinkDown(this.maxCoords);
	}

	get max(): Value | null {
		const item = this.getItem(this.maxCoords);

		return item && item.value;
	}

	// ***

	constructor(...values: Value[]) {
		for (const value of values)
			this.add(value);
	}

	add(value: Value): this {
		const item: Item<Value> = { value };

		const nextRowIndex = this.grid.length - 1;
		const nextRowCapacity = 2 ** nextRowIndex;
		const nextRow = this.grid[nextRowIndex];

		if (nextRow.length < nextRowCapacity)
			this.bubbleUp({
				row: nextRowIndex,
				col: nextRow.push(item) - 1,
			});

		else this.bubbleUp({
			row: this.grid.push([ item ]) - 1,
			col: 0,
		});

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

	private swap(a: Item<Value>, b: Item<Value>) {
		[ a.value, b.value ] = [ b.value, a.value ];
	}

	private getItem({ row, col }: Coords): Item<Value> | null {
		return this.grid[row] ? this.grid[row][col] : null;
	}

	private getParentCoords(childCoords: Coords): Coords | null {
		if (childCoords.row === 0 || this.getItem(childCoords) == null)
			return null;

		return {
			row: childCoords.row - 1,
			col: Math.floor(childCoords.col / 2),
		};
	}

	private getChildrenCoords(parentCoords: Coords): [ Coords, Coords ] | null {
		if (parentCoords.row === this.grid.length - 1 || this.getItem(parentCoords) == null)
			return null;

		const row = parentCoords.row + 1;
		const col = parentCoords.col * 2;

		return [
			{ row, col },
			{ row, col: col + 1 },
		];
	}

	private bubbleUp(childCoords: Coords) {
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

	private sinkDown(parentCoords: Coords) {
		const childrenCoords = this.getChildrenCoords(parentCoords);

		if (!childrenCoords)
			return;

		const parent = this.getItem(parentCoords)!;

		for (const childCoords of childrenCoords) {
			const child = this.getItem(childCoords);

			if (child == null || child.value <= parent.value)
				continue;
	
			this.swap(parent, child);
			this.sinkDown(childCoords);

			break;
		}
	}
}
