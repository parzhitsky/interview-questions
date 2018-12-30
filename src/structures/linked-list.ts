/** @private */
interface Node<Value> {
	value: Value;
	next: Node<Value> | null;
}

/** defines a list of values, each of which points to the next one (if any) */
export default class LinkedList<Value = any> {
	head: Node<Value> | null = null;

	get size(): number {
		let result = 0;

		let current = this.head;

		while (current) {
			result++;

			current = current.next;
		}

		return result;
	}

	// ***

	constructor(...values: Value[]) {
		for (const value of values)
			this.append(value);
	}

	append(value: Value): void {
		const node: Node<Value> = { value, next: null };

		if (this.head == null) {
			this.head = node;

			return;
		}

		let last: Node<Value> = this.head;

		while (last.next)
			last = last.next;

		last.next = node;
	}

	prepend(value: Value): void {
		this.head = { value, next: this.head };
	}

	remove(value: Value): void {
		if (this.head == null)
			return;

		if (this.head.value === value) {
			this.head = this.head.next;
			return;
		}

		for (let current = this.head; current.next != null; current = current.next)
			if (current.next.value === value) {
				current.next = current.next.next;

				break;
			}
	}

	*values() {
		for (let current = this.head; current != null; current = current.next)
			yield current.value;
	}
}
