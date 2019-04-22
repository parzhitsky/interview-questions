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

	function traverseSection(section: Section, start: Coords) {
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
	}

	for (const [ rowIndex, row ] of grid.entries())
		for (const [ itemIndex, color ] of row.entries()) {
			const section: Section = { color, tiles: [] };

			traverseSection(section, [ rowIndex, itemIndex ]);

			sizes.add(section.tiles.length);
		}

	return sizes.max || 0;
}
