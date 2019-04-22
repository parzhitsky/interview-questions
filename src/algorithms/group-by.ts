/** Groups items in the list by a given grouper */
export default function groupBy<Item, GroupKey extends string = string>(items: Item[], grouper: (item: Item) => GroupKey): Record<GroupKey, Item[]> {
	const map = {} as Record<GroupKey, Item[]>;

	for (const item of items) {
		const groupKey = grouper(item);

		if (groupKey in map)
			map[groupKey].push(item);

		else map[groupKey] = [item];
	}

	return map;
}
