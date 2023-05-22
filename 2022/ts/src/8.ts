export { };

const input = `30373
25512
65332
33549
35390`;

const splitInput = input
    .split('\n')
    .map((x) => x
        .split('')
        .map((y) => parseInt(y)));

const isVisibleFromEdge = (input: number[][], x: number, y: number): boolean => {
    const covered = [false, false, false, false];
    for (let i = 1; i < input.length; i++) {
        for (const [index, value] of [input[y - i]?.[x], input[y + i]?.[x], input[y]?.[x - i], input[y]?.[x + i]].entries()) {
            if (covered[index]) { continue; }
            if (value === undefined) { return true; }
            if (value >= input[y][x]) { covered[index] = true; }
        }
    }
    return false;
};

const scenicScore = (input: number[][], x: number, y: number): number => {
    const score = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < input.length; j++) {
            const value = [input[y - j]?.[x], input[y + j]?.[x], input[y]?.[x - j], input[y]?.[x + j]][i];
            if (value === undefined) { break; }
            score[i]++;
            if (value >= input[y][x]) { break; }
        }
    }
    return score.reduce((a, b) => a * b);
};

const acc = new Array<[number, number]>();
let highest = 0;
for (const [y, row] of splitInput.entries()) {
    for (const [x, _] of row.entries()) {
        if (isVisibleFromEdge(splitInput, x, y)) {
            acc.push([x, y]);
        }
        highest = Math.max(highest, scenicScore(splitInput, x, y));
    }
}

console.log(`Part 1: ${acc.length}, Part 2: ${highest}`);