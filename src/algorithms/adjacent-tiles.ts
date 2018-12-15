import MaxHeap from "../structures/max-heap";

export type Color = number;
export type Grid = Color[][];

/** @private */
type Coords = [
	/* row: */ number,
	/* col: */ number
];

/** @private */
type Section = {
	color: Color;
	tiles: Coords[];
};

/** @private */
type Excluded = Record<string, true>;

// ***

/** @private */
function* entriesOf<T>(list: T[]) {
	for (let i = 0; i < list.length; i++)
		yield [ list[i], i ] as [ T, number ];
}

/** @private */
function* neighboursOf([ rowIndex, itemIndex ]: Coords) {
	yield <Coords> [ rowIndex - 1, itemIndex ]; // up
	yield <Coords> [ rowIndex, itemIndex + 1 ]; // right
	yield <Coords> [ rowIndex + 1, itemIndex ]; // down
	yield <Coords> [ rowIndex, itemIndex - 1 ]; // left
}

/** on a given 2-dimensional grid, finds the biggest number of adjacent tiles of the same color */
export default function adjacentTiles(grid: Grid): number {
	const excluded: Excluded = {};
	const sizes = new MaxHeap();

	function traverseSection(section: Section, start: Coords): Section {
		const tileID = String(start);

		if (!excluded[tileID]) {
			excluded[tileID] = true;
			section.tiles.push(start);
	
			for (const [ rowIndex, itemIndex ] of neighboursOf(start))
				if (
					rowIndex >= 0 &&
					itemIndex >= 0 &&
					rowIndex < grid.length &&
					itemIndex < grid[rowIndex].length &&
					grid[rowIndex][itemIndex] === section.color
				)
					traverseSection(section, [ rowIndex, itemIndex ]);
		}

		return section;
	}

	for (const [ row, rowIndex ] of entriesOf(grid))
		for (const [ color, itemIndex ] of entriesOf(row)) {
			const { tiles: { length: size } } =
				traverseSection({ color, tiles: [] }, [ rowIndex, itemIndex ]);

			sizes.add(size);
		}

	return sizes.max || 0;
}
