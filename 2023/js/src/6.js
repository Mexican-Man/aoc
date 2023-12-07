const input = `Time:      7  15   30
Distance:  9  40  200`;

const lines = input
    .split('\n')
    .map((line) => line
        .split(':')[ 1 ]
        .trim()
        .split(/\s+/)
        .map((value) => parseInt(value)));

// Join time and distances into array of objects
const races = lines[ 0 ].map((time, index) => ({
    time,
    distance: lines[ 1 ][ index ]
}));

const nums = [];
for (const race of races) {
    let ways = 0;
    for (let y = 1, x = race.time - 1; true; y++, x--) {
        if (x === 0) break;
        if (x * y <= race.distance) continue;

        ways++;
    }
    nums.push(ways);
}

console.log(nums.reduce((a, b) => a * b, 1));

// Part 2

const lines2 = input
    .split('\n')
    .map((line) => parseInt(line
        .split(':')[ 1 ]
        .replace(/\s+/g, '')));

const races2 = [ { time: lines2[ 0 ], distance: lines2[ 1 ] } ];

nums.length = 0;
for (const race of races2) {
    let ways = 0;
    for (let y = 1, x = race.time - 1; true; y++, x--) {
        if (x === 0) break;
        if (x * y <= race.distance) continue;

        ways++;
    }
    nums.push(ways);
}

console.log(nums.reduce((a, b) => a * b, 1));