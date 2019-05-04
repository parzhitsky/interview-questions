export type InputArgs = [ any[], (item: any) => string ];
export type Output = Record<string, any[]>;

/** Groups items in the list by a given grouper */
export default function groupBy(...args: InputArgs): Output {
	const [ items, grouper ] = args;

	const map = {} as Output;

	for (const item of items) {
		const groupKey = grouper(item);

		if (groupKey in map)
			map[groupKey].push(item);

		else map[groupKey] = [item];
	}

	return map;
}
