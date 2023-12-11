const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const lines = input.split("\n");
const histories = lines.map((line) => line.split(" ").map((n) => parseInt(n)));

const instabilities = histories.map((history) => {
    let arr = [ history ];

    while (arr.at(-1)?.reduce((a, b) => a + b, 0) !== 0) {
        let newHistory = [];
        for (let i = 0; i < (arr.at(-1) ?? []).length - 1; i++) {
            const first = (arr.at(-1) ?? [])[ i ];
            const second = (arr.at(-1) ?? [])[ i + 1 ];

            newHistory.push(second - first);
        }

        arr.push(newHistory);
    }

    return arr;
});

const summedInstabilities = instabilities.map((instability) => {
    return instability.map((history) => history.at(-1) ?? 0);
});

const summedSummedInstabilities = summedInstabilities.map((instability) => {
    return instability.reduce((a, b) => a + b, 0);
});

const summedSummedSummedInstabilities = summedSummedInstabilities.reduce((a, b) => a + b, 0);

console.log(summedSummedSummedInstabilities);

// Part 2

const summeReverseInstabilities = instabilities.map((instability) => {
    return instability.map((history) => history.at(0) ?? 0);
});

const summedSummedReverseInstabilities = summeReverseInstabilities.map((instability) => {
    return instability.reverse().reduce((a, b) => b - a, 0);
});

const summedSummedSummedReverseInstabilities = summedSummedReverseInstabilities.reduce((a, b) => a + b, 0);

console.log(summedSummedSummedReverseInstabilities);