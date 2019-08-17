/** @private */
interface Node<Value> {
	value: Value;
	next: NodeRaw<Value>;
}

/** @private */
type NodeRaw<Value> = Node<Value> | null;

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

	remove(isTarget: (value: Value) => boolean): void {
		for (const node of this.nodes())
			if (node.next && isTarget(node.next.value)) {
				node.next = node.next.next;

				break;
			}
	}

	*values(): IterableIterator<Value> {
		for (const node of this.nodes())
			yield node.value;
	}

	private *nodes(): IterableIterator<Node<Value>> {
		for (let node = this.head; node != null; node = node.next)
			yield node;
	}
}
