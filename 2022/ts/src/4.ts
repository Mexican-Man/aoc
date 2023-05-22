export { };

const input = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

class Assignment {
    readonly min: number;
    readonly max: number;

    constructor(input: string) {
        const [min, max] = input.split('-').map((n) => parseInt(n));
        this.min = min;
        this.max = max;
    }
}

class AssignmentGroup {
    readonly assignments: Assignment[];

    constructor(input: string) {
        this.assignments = input.split(',').map((assignment) => new Assignment(assignment));
    }

    fullOverlap(): boolean {
        return this.assignments
            .some((a1, i1) => this.assignments
                .some((a2, i2) => i1 !== i2 && a2.min <= a1.min && a2.max >= a1.max)); // a2 contains a1, a1 is not a2
    }

    partialOverlap(): boolean {
        return this.assignments
            .some((a1, i1) => this.assignments
                .some((a2, i2) => i1 !== i2 && (a2.min <= a1.min) === (a2.max >= a1.min))); // a2 is only partially overlapping a1, a1 is not a2
    }
}

const splitInput = input
    .split('\n')
    .map((group) => new AssignmentGroup(group));

const fullOverlapTimes = splitInput.filter((group) => group.fullOverlap()).length;
const partialOverlapTimes = splitInput.filter((group) => group.partialOverlap()).length;

console.log(`Part 1: ${fullOverlapTimes}\nPart 2: ${partialOverlapTimes}`);
