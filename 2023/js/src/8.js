const input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const [ dir, , ...lines ] = input.split('\n');

const directions = dir.split('');

/** @type {Map<string, [string, string]>} */
const nodes = new Map();

for (const line of lines) {
    const matches = /^([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})\)$/.exec(line);
    if (!matches) throw new Error(`Invalid line: ${ line }`);

    const [ , node, left, right ] = matches;
    nodes.set(node, [ left, right ]);
}

let currentNode = 'AAA';
let steps = 0;
while (true) {
    if (currentNode === 'ZZZ') { break; }

    const dirs = nodes.get(currentNode);
    if (!dirs) throw new Error(`Invalid node: ${ currentNode }`);

    const [ left, right ] = dirs;
    const direction = directions[ steps % directions.length ];
    currentNode = direction === 'L' ? left : right;
    steps++;
}

// console.log(visited.size - 1); // We start at AAA, so we don't count it
console.log(steps);

// Part 2

const currentNodes = [ ...nodes.keys() ].filter(node => node.endsWith('A'));
const timesVisited = new Array(currentNodes.length).fill(0);
const visited = new Array(currentNodes.length).fill(null).map(() => new Array());

steps = 0;
while (true) {
    if (currentNodes.every(node => node.endsWith('Z'))) { break; }

    for (let i = 0; i < currentNodes.length; i++) {
        const node = currentNodes[ i ];
        const dirs = nodes.get(node);
        if (!dirs) throw new Error(`Invalid node: ${ node }`);

        visited[ i ].push(node);

        if (node.endsWith('Z')) {
            timesVisited[ i ]++;
            if (timesVisited[ i ] > 1) continue;
        }

        const [ left, right ] = dirs;
        const direction = directions[ steps % directions.length ];
        currentNodes[ i ] = direction === 'L' ? left : right;
    }
    steps++;
}

// Find LCM
const gcm = (a, b) => a === 0 ? b : gcm(b % a, a);
const lcm = (a, b) => a * b / gcm(a, b);

const firsts = visited.map(nodes => nodes.findIndex(node => node.endsWith('Z')));

console.log(firsts.reduce(lcm));