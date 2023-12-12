const input = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

const lines = input.split('\n');
const map = lines.map(line => line.split(''));

/**
 * @param {string[][]} input
 * @param {number} x 
 * @param {number} y 
 * @returns {[number, number][]}
 */
const adjacent = (input, x, y) => {
    switch (input[ y ][ x ]) {
        case '|':
            return [ [ x, y - 1 ], [ x, y + 1 ] ];
        case '-':
            return [ [ x - 1, y ], [ x + 1, y ] ];
        case 'L':
            return [ [ x + 1, y ], [ x, y - 1 ] ];
        case 'J':
            return [ [ x - 1, y ], [ x, y - 1 ] ];
        case 'F':
            return [ [ x, y + 1 ], [ x + 1, y ] ];
        case '7':
            return [ [ x, y + 1 ], [ x - 1, y ] ];
        case 'S':
            return inferAdjacent(input, x, y);
        default:
            return [];
    }
};

/**
 * Replace S with whatever appropriate tile it should have, based on the adjacent tiles
 * @param {string[][]} input 
 * @param {number} x
 * @param {number} y 
 */
const fixTile = (input, x, y) => {
    const adj = adjacent(input, x, y);
    if (adj.length === 0) throw new Error('No adjacent tiles');

    const [ ax, ay ] = adj[ 0 ];
    const [ bx, by ] = adj[ 1 ];

    if (ax === bx) {
        input[ y ][ x ] = '|';
    } else if (ay === by) {
        input[ y ][ x ] = '-';
    } else if (ax < bx) {
        if (ay < by) {
            input[ y ][ x ] = 'L';
        } else {
            input[ y ][ x ] = 'F';
        }
    } else {
        if (ay < by) {
            input[ y ][ x ] = 'J';
        } else {
            input[ y ][ x ] = '7';
        }
    }
};

/**
 * @param {string[][]} input
 * @param {number} x
 * @param {number} y
 */
const inferAdjacent = (input, x, y) => {
    /** @type {[number, number][]} */
    const adj = [];

    // Check adjacent on each side of the current tile
    if ([ '|', 'F', '7' ].includes(input[ y - 1 ]?.[ x ])) adj.push([ x, y - 1 ]);
    if ([ '|', 'L', 'J' ].includes(input[ y + 1 ]?.[ x ])) adj.push([ x, y + 1 ]);
    if ([ '-', 'L', 'F' ].includes(input[ y ]?.[ x - 1 ])) adj.push([ x - 1, y ]);
    if ([ '-', 'J', '7' ].includes(input[ y ]?.[ x + 1 ])) adj.push([ x + 1, y ]);

    return adj;
};


/**
 * @param {string[][]} input
 * @param {number} x
 * @param {number} y
 */
const loopLength = (input, x, y) => {
    const initial = inferAdjacent(input, x, y);

    /** @type {[number, number][][]} */
    let runs = new Array(initial.length);
    for (let i = 0; i < initial.length; i++) {

        let run = [ initial[ i ] ];
        let visited = new Set([ `${ x },${ y }` ]);

        while (true) {
            const [ cx, cy ] = run.at(-1) ?? [];
            if (cx === undefined || cy === undefined) throw new Error('cx or cy is undefined');

            if (cx === x && cy === y) break;

            const next = adjacent(input, cx, cy).filter(([ nx, ny ]) => !visited.has(`${ nx },${ ny }`));
            visited.add(`${ cx },${ cy }`);

            if (next.length === 0) {
                break;
            }

            run.push(next[ 0 ]);
        }

        runs[ i ] = run;
    }

    return runs;
};

// Find S in the map
let sx, sy;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[ y ].length; x++) {
        if (map[ y ][ x ] === 'S') {
            sx = x;
            sy = y;
        }
    }
}

if (sx === undefined || sy === undefined) throw new Error('S not found');

const runs = loopLength(map, sx, sy);
console.log(Math.ceil(Math.min(...runs.map(run => run.length)) / 2));

// Part 2

fixTile(map, sx, sy);
/** @type {Set<string>} */
let emptySpaces = new Set();
for (let y = 0; y < map.length; y++) {
    let contained = false;
    let row = map[ y ];
    for (let x = 0; x < map[ y ].length; x++) {
        let cell = row[ x ];

        // If valid part of pipe, skip
        if (contained && cell === '.') {
            emptySpaces.add(`${ x },${ y }`);
            continue;
        }

        // Compare with runs[0] to find unused pipes
        if (![ [ sx, sy ], ...runs[ 0 ] ].some(([ rx, ry ]) => rx === x && ry === y)) {
            if (contained) {
                emptySpaces.add(`${ x },${ y }`);
            }
            continue;
        }

        if (cell === '|') {
            if (cell)
                contained = !contained;
        } else {
            let isNorth = cell === 'L' || cell === 'J';
            let isSouth = cell === 'F' || cell === '7';

            if (cell === '-') continue;

            // Find next corner in the row
            if (cell === 'L' || cell === 'F') {
                let nextCorner = row.slice(x + 1).findIndex(c => c === 'J' || c === '7');
                const nextIsNorth = nextCorner !== -1 && (row[ x + 1 + nextCorner ] === 'J' || row[ x + 1 + nextCorner ] === '7');
                const nextIsSouth = nextCorner !== -1 && (row[ x + 1 + nextCorner ] === 'L' || row[ x + 1 + nextCorner ] === 'F');
                if (isNorth !== nextIsNorth || isSouth !== nextIsSouth) { contained = !contained; }
            } else if (cell === 'J' || cell === '7') {
                let nextCorner = row.slice(0, x).findIndex(c => c === 'L' || c === 'F');
                const nextIsNorth = nextCorner !== -1 && (row[ nextCorner ] === 'L' || row[ nextCorner ] === 'F');
                const nextIsSouth = nextCorner !== -1 && (row[ nextCorner ] === 'J' || row[ nextCorner ] === '7');
                if (isNorth !== nextIsNorth || isSouth !== nextIsSouth) { contained = !contained; }
            }
        }
    }
}

console.log(emptySpaces.size);