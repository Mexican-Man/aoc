export { };

const input = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

const FindStartPosition = (input: string, distinctChars: number): number => {
    for (const [index, _] of input.split('').entries()) {
        if (index < distinctChars) { continue; }

        if (new Set(input.slice(index - distinctChars, index)).size === distinctChars) {
            return index;
        }
    }
    return -1;
};

console.log(`Part 1: ${FindStartPosition(input, 4)}`, `Part 2: ${FindStartPosition(input, 14)}`);