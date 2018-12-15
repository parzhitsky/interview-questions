/** @private */
interface Comparable {
	valueOf(): number | string;
}

/** @private */
interface Item<Value extends Comparable = number> {
	value: Value;
}

// ***

/** @private */
function* childrenIndexesOf(itemIndex: number) {
	const doubled = itemIndex * 2;

	yield doubled + 1;
	yield doubled + 2;
}

/** describes binary heap structure with max value being made easy to retrieve */
export default class MaxHeap<Value extends Comparable = number> {
	private readonly items: Item<Value>[] = [];

	get size(): number {
		return this.items.length;
	}

	set max(value: Value | null) {
		if (value != null)
			this.items[0] = { value };

		else if (this.size > 1)
			this.items[0] = this.items.pop()!;

		else this.items.pop();

		if (this.size > 1)
			this.sink(0);
	}

	get max(): Value | null {
		const [ maxItem ] = this.items;

		return maxItem && maxItem.value;
	}

	// ***

	constructor(...values: Value[]) {
		for (const value of values)
			this.add(value);
	}

	add(value: Value): this {
		this.float(this.items.push({ value }) - 1);

		return this;
	}

	toArray(): Value[] {
		return this.items.map((item) => item.value);
	}

	// ***

	private swap(a: Item<Value>, b: Item<Value>) {
		[ a.value, b.value ] = [ b.value, a.value ];
	}

	private getChildIndex(itemIndex: number): number | null {
		let childIndex: number | null = null;

		for (const candidateIndex of childrenIndexesOf(itemIndex))
			if (candidateIndex < this.size && (childIndex == null || this.items[childIndex].value < this.items[candidateIndex].value))
				childIndex = candidateIndex;

		return childIndex;
	}

	private float(itemIndex: number) {
		if (itemIndex <= 0)
			return;

		const parentIndex = Math.floor((itemIndex - 1) / 2);

		const item = this.items[itemIndex];
		const parent = this.items[parentIndex];

		if (item.value <= parent.value)
			return;

		this.swap(item, parent);
		this.float(parentIndex);
	}

	private sink(itemIndex: number) {
		const childIndex = this.getChildIndex(itemIndex);

		if (childIndex == null)
			return;

		const item = this.items[itemIndex];
		const child = this.items[childIndex];

		if (child.value <= item.value)
			return;

		this.swap(child, item);
		this.sink(childIndex);
	}
}
