export { };

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

type Food = number;
type Elf = Array<Food>;

const splitInput = input
    .split('\n\n')
    .map((group) => group
        .split('\n')
        .map((line) => parseInt(line, 10) as Food) as Elf);

const elvesTotalCalories = splitInput
    .map((elf) => elf
        .reduce((calorieCount, food) => calorieCount + food, 0));

const elvesTotalSorted = elvesTotalCalories.sort((a, b) => b - a);

const top1 = elvesTotalSorted[0];

const top3Acc = elvesTotalSorted
    .slice(0, 3)
    .reduce((total, calories) => total + calories, 0);

console.log(`Part 1: ${top1}\nPart 2: ${top3Acc}`);