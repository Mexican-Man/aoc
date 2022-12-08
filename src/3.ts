export { };

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const LetterPriority = (l: number) => l < 91 ? l - 38 : l - 96;

console.log(LetterPriority('L'.charCodeAt(0)));

const splitInput = input
    .split('\n')
    .map((group) => {
        const arr = group
            .split('')
            .map((char) => char.charCodeAt(0));
        return [arr.slice(0, arr.length / 2), arr.slice(arr.length / 2)];
    });

const occurringTwice = splitInput.map((groups) => {
    const set = new Set<number>(groups?.[0]);
    return groups?.[1].find((char) => set.has(char))!; // Doesn't exist, add to set and return false
});

const occurringTwicePriority = occurringTwice.reduce((total, char) => total + LetterPriority(char), 0);

const badges = new Array<number>();
for (let i = 0; i < splitInput.length; i = i + 3) {
    const groups = splitInput.slice(i, i + 3);
    const set1 = new Set<number>(groups?.[0].flat());
    const set2 = new Set<number>(groups?.[1].flat());
    badges.push(groups?.[2].flat().find((char) => set1.has(char) && set2.has(char))!);
}

const badgesPriority = badges.reduce((total, char) => total + LetterPriority(char), 0);

console.log(`Part 1: ${occurringTwicePriority}\nPart 2: ${badgesPriority}`);