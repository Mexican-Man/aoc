export { };

const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

class Movement {
    readonly quantity: number;
    readonly from: number;
    readonly to: number;

    constructor(input: string) {
        const [_1, quantity, _2, from, _3, to] = input.split(' ').map((n) => parseInt(n));
        this.quantity = quantity;
        this.from = from - 1;
        this.to = to - 1;
    }
}

class Stacks {
    readonly stacks: string[][];

    constructor(input: string) {
        const initLines = input.split('\n');
        const size = initLines[initLines.length - 1].trim().split('   ').length;
        this.stacks = new Array(size).fill(0).map(() => new Array());

        initLines
            .slice(0, initLines.length - 1)
            .forEach((line) => {
                for (const [i, item] of Array.from(line.matchAll(/(.{3})\W?/g)).entries()) {
                    const letter = item[0].match(/\[([A-Z])\]/)?.[0];
                    if (letter) {
                        this.stacks[i].unshift(letter[1]);
                    }
                }
            });
    }

    CrateMover9000(movement: Movement): void {
        for (let i = 0; i < movement.quantity; i++) {
            this.stacks[movement.to].push(this.stacks[movement.from].pop()!);
        }
    }

    CrateMover9001(movement: Movement): void {
        const queue = new Array<string>();
        for (let i = 0; i < movement.quantity; i++) {
            queue.push(this.stacks[movement.from].pop()!);
        }
        for (let i = 0; i < movement.quantity; i++) {
            this.stacks[movement.to].push(queue.pop()!);
        }
    }

    print(): void {
        const biggestSize = Math.max(...this.stacks.map((stack) => stack.length));
        for (let i = biggestSize - 1; i >= 0; i--) {
            const line = this.stacks.map((stack) => stack[i] ? `[${stack[i]}]` : '   ').join(' ');
            console.log(line);
        }
        console.log(this.stacks.map((_, i) => ` ${i + 1} `).join(' '));
    }

    answer(): string {
        return this.stacks.map((stack) => stack[stack.length - 1]).join('');
    }
}

const [a1, a2] = ["", ""].map((_, i) => {
    const [initStr, movesStr] = input.split('\n\n');
    const stacks = new Stacks(initStr);

    const movements = movesStr.split('\n').map((move) => new Movement(move));
    movements.forEach((movement) => (i === 0 ? stacks.CrateMover9000(movement) : stacks.CrateMover9001(movement)));

    return stacks.answer();
});

console.log(`Part 1: ${a1}\nPart 2: ${a2}`);