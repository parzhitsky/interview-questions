export type InputArgs = [ any[] ];
export type Output = any[];

/** mutates a given list of items by removing all duplicates */
export default function removeDuplicates(...args: InputArgs): Output {
	const [ items ] = args;

	const set = new Set();

	for (let index = 0; index < items.length;) {
		const item = items[index];

		if (set.has(item))
			items.splice(index, 1);

		else {
			set.add(item);
			index++;
		}
	}

	return items;
}
