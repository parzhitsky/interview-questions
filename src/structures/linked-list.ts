/** @private */
interface Node<Value> {
	value: Value;
	next: NodeRaw<Value>;
}

/** @private */
type NodeRaw<Value> = Node<Value> | null;

/** @private */
type Predicate<Value> = (value: Value) => boolean;

/** defines a list of values, each of which points to the next one (if any) */
export default class LinkedList<Value = any> {
	private head: NodeRaw<Value> = null;

	private get tail(): NodeRaw<Value> {
		let tail: NodeRaw<Value> = null;

		for (const node of this.nodes())
			tail = node;

		return tail;
	}

	get size(): number {
		let result = 0;

		for (const _ of this.nodes())
			result++;

		return result;
	}

	// ***

	constructor(...values: Value[]) {
		for (const value of values)
			this.append(value);
	}

	append(value: Value): void {
		const { tail } = this;

		if (tail)
			tail.next = { value, next: null };

		else this.prepend(value);
	}

	prepend(value: Value): void {
		this.head = { value, next: this.head };
	}

	remove(isTarget: Predicate<Value>): boolean {
		return this._remove(isTarget, true);
	}

	removeAll(isTarget: Predicate<Value>): boolean {
		return this._remove(isTarget, false);
	}

	clear(): boolean {
		const hasSize = this.head != null;

		this.head = null;

		return hasSize;
	}

	*values(): IterableIterator<Value> {
		for (const node of this.nodes())
			yield node.value;
	}

	private *nodes(): IterableIterator<Node<Value>> {
		for (let node = this.head; node != null; node = node.next)
			yield node;
	}

	private _remove(isTarget: Predicate<Value>, onlyOnce: boolean): boolean {
		let removed = false;

		let curr: NodeRaw<Value> = null;
		let prev: NodeRaw<Value> = null;

		for (curr = this.head; curr != null; curr = curr.next)
			if (!isTarget(curr.value))
				prev = curr;

			else {
				if (prev)
					prev.next = curr.next;

				else this.head = curr.next;

				removed = true;

				if (onlyOnce)
					break;
			}

		return removed;
	}
}
