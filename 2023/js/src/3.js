const input = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

let symbols = /[<>,?/~`!@#$%^&*()\-_=+]/;

const grid = input.split('\n').map((row) => row.split(''));

/** @type Array<string> */
let chars = [];
let adjacents = [];

const numbers = [];

/** @type Array<[number,[number,number]]> */
const gears = [];
for (let y = 0; y < grid.length; y++) {
    const row = grid[ y ];

    for (let x = 0; x < row.length; x++) {
        const char = row[ x ];

        if (char.match(symbols) || char === '.') {
            if (chars.length > 0 && adjacents.length > 0) {
                const num = parseInt(chars.join(''));
                numbers.push(num);

                for (const adj of adjacents) {
                    if (adj[ 0 ] && grid[ adj[ 0 ] ][ adj[ 1 ] ] === '*') {
                        gears.push([ num, [ adj[ 0 ], adj[ 1 ] ] ]);
                    }
                }
            }
            chars.length = 0;
            adjacents.length = 0;
            continue;
        } else {
            chars.push(char);
        }

        const offsets = [
            { x: -1, y: 0 },
            { x: 1, y: 0 },
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            { x: -1, y: -1 },
            { x: -1, y: 1 },
            { x: 1, y: -1 },
            { x: 1, y: 1 },
        ];

        const currentAdjacent = offsets.filter(offset => grid[ y + offset.y ]?.[ x + offset.x ]?.match(symbols));
        if (currentAdjacent.length > 0) {
            adjacents.push(...currentAdjacent.map(offset => [ y + offset.y, x + offset.x ]));
        }
    }
}

console.log(numbers.reduce((a, b) => a + b, 0));

// Group gears into pairs where their coordinates match

/** @type Map<number, Array<typeof gears[number]>> */
// @ts-ignore
const data = Map.groupBy(gears, gear => `${ gear[ 1 ][ 0 ] },${ gear[ 1 ][ 1 ] }`).entries();
const grouped = [ ...data ]
    .map((d) => d[ 1 ]
        .map((g) => g[ 0 ])
        .filter((g, i, arr) => arr
            .indexOf(g) === i))
    .filter((g) => g.length === 2);

console.log(Object.values(grouped).map(arr => arr.reduce((a, b) => a * b, 1)).reduce((a, b) => a + b, 0));
