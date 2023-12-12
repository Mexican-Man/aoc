const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

let inputArray = input.split("\n").map(line => line.split(""));

// Find all galaxies
/** @type {[number,number][]} */
const galaxies = [];
for (let y = 0; y < inputArray.length; y++) {
    for (let x = 0; x < inputArray[ y ].length; x++) {
        if (inputArray[ y ][ x ] === "#") {
            galaxies.push([ x, y ]);
        }
    }
}

// First is distance, second is number of empty rows/columns between the two galaxies
/** @type {Map<string, [number, number]>} */
const distances = new Map();

// For each galaxy, find the distance between all other galaxies
for (let i = 0; i < galaxies.length; i++) {
    for (let j = 0; j < galaxies.length; j++) {
        const key = [ i, j ].sort().join(",");
        const distance = Math.abs(galaxies[ i ][ 0 ] - galaxies[ j ][ 0 ]) + Math.abs(galaxies[ i ][ 1 ] - galaxies[ j ][ 1 ]);

        // Find the number of empty rows/columns between the two galaxies
        const emptyRows = inputArray.filter((line, y) => {
            return y > Math.min(galaxies[ i ][ 1 ], galaxies[ j ][ 1 ]) && y < Math.max(galaxies[ i ][ 1 ], galaxies[ j ][ 1 ]) && line.every(c => c === ".");
        }).length;
        const emptyColumns = inputArray[ 0 ].filter((_, x) => {
            return x > Math.min(galaxies[ i ][ 0 ], galaxies[ j ][ 0 ]) && x < Math.max(galaxies[ i ][ 0 ], galaxies[ j ][ 0 ]) && inputArray.every(line => line[ x ] === ".");
        }).length;

        distances.set(key, [ distance, emptyRows + emptyColumns ]);
    }
}

// Part 1
// Empty rows/columns are 2 units long
console.log([ ...distances.values() ].map(([ distance, expansion ]) => (distance - expansion) + (expansion * 2)).reduce((a, b) => a + b));

// Part 2
// Empty rows are actually 1000000 times longer, not 2
console.log([ ...distances.values() ].map(([ distance, expansion ]) => (distance - expansion) + (expansion * 1000000)).reduce((a, b) => a + b));
