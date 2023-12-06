const input = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const cards = input.split('\n').map((line) => {
    const [ id, rest ] = line.split(':');
    const nums = rest
        .split('|')
        .map((l) => l
            .trim()
            .split(/\s+/)
            .map((n) => n
                .trim()));

    return {
        id: parseInt(/Card\s+(\d+)/.exec(line)?.[ 1 ] || '0'),
        winning: nums[ 0 ],
        our: nums[ 1 ]
    };
});

let score = 0;
for (const card of cards) {
    const intersection = card.winning.filter((n) => card.our.includes(n));
    if (intersection.length > 0) score += 2 ** (intersection.length - 1);
}

console.log(score);

// Part 2

const stack = [ ...cards ].reverse();
let count = stack.length;

/** @type Map<number, number> */
const counts = new Map();

while (stack.length > 0) {
    const card = stack.pop();
    if (!card) continue;


    const intersection = card.winning.filter((n) => card.our.includes(n));
    for (let i = 0; i < intersection.length; i++) {
        stack.push(cards[ card.id + i ]);
    }

    counts.set(card.id, (counts.get(card.id) ?? 0) + 1);
}

console.log([ ...counts.values() ].reduce((a, b) => a + b, 0));