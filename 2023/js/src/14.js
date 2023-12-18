const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

let columns = input.split('\n').map((_, colIndex) => input.split('\n').map(row => row[ colIndex ]));

/** @param {string[]} column */
const sort = (column) => {
    let i = 0;
    while (i < column.length - 1) {
        if (column[ i ] === '.' && column[ i + 1 ] === 'O') {
            column[ i ] = 'O';
            column[ i + 1 ] = '.';
            i = -1;
        }
        i++;
    }
};

/** @param {string[]} column */
const score = (column) => column.reduce((acc, curr, i) => acc + (curr === 'O' ? column.length - i : 0), 0);

// Part 1

// columns.forEach(sort);

// columns.forEach((_, i) => console.log(columns.map(c => c[ i ]).join(''), columns.length - i));
// console.log(columns.reduce((acc, curr) => acc + score(curr), 0));

// Part 2

/** 
 * Rotate in-place 90 degrees clockwise or counterclockwise
 * @param {string[][]} columns
 * @param {'clockwise'|'counterclockwise'} direction 
 */
const rotate = (columns, direction) => {
    const length = columns.length;

    for (let i = 0; i < Math.floor(length / 2); i++) {
        for (let j = i; j < length - i - 1; j++) {
            const temp = columns[ i ][ j ];
            if (direction === 'clockwise') {
                columns[ i ][ j ] = columns[ length - j - 1 ][ i ];
                columns[ length - j - 1 ][ i ] = columns[ length - i - 1 ][ length - j - 1 ];
                columns[ length - i - 1 ][ length - j - 1 ] = columns[ j ][ length - i - 1 ];
                columns[ j ][ length - i - 1 ] = temp;
            } else {
                columns[ i ][ j ] = columns[ j ][ length - i - 1 ];
                columns[ j ][ length - i - 1 ] = columns[ length - i - 1 ][ length - j - 1 ];
                columns[ length - i - 1 ][ length - j - 1 ] = columns[ length - j - 1 ][ i ];
                columns[ length - j - 1 ][ i ] = temp;
            }
        }
    }
};

/** @type Map<string, number> */
let cache = new Map();

console.time('rotate');
for (let count = 0; count < 1000000000; count++) {
    const key = columns.map(c => c.join('')).join('\n');

    const firstOccurrence = cache.get(key);
    if (firstOccurrence) {
        // Skip to the iteration just before the pattern would repeat.
        const patternLength = count - firstOccurrence;
        count = 1000000000 - (1000000000 - count) % patternLength;
    }

    for (let i = 0; i < 4; i++) {
        columns.forEach(sort);
        rotate(columns, 'counterclockwise');
    }

    cache.set(key, count);
}
console.timeEnd('rotate');


columns.forEach((_, i) => console.log(columns.map(c => c[ i ]).join(''), columns.length - i));
console.log(columns.reduce((acc, curr) => acc + score(curr), 0));
