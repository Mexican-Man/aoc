const input = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

const strings = input.split(',');

/** @param {string} str */
const hash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i);
        hash *= 17;
        hash %= 256;
    }

    return hash;
};

const hashes = strings.map(hash);

console.log(hashes.reduce((acc, curr) => acc + curr, 0));

// Part 2

const lenses = strings.map(str => {
    const split = /^([a-z]+)(=|-)(\d+)?$/.exec(str);
    if (!split) throw new Error(`Invalid string: ${ str }`);

    const [ , label, op, value ] = split;
    return {
        label,
        op,
        value: parseInt(value),
    };
});

/** @type Map<number,Array<{ label: string, value: number }>> */
const hashmap = new Map();

for (const lens of lenses) {
    const { label, op, value } = lens;
    const box = hash(label);
    const arr = hashmap.get(box) || [];

    if (op === '-') {
        const found = arr.findIndex(item => item.label === label);
        if (found !== -1) arr.splice(found, 1);
    } else if (op === '=') {
        if (arr.some(item => item.label === label)) {
            arr[ arr.findIndex(item => item.label === label) ] = { label, value };
        } else {
            arr.push({ label, value });
        }
    } else {
        throw new Error(`Invalid op: ${ op }`);
    }

    hashmap.set(box, arr);
}

let sum = 0;
for (const [ box, arr ] of hashmap) {
    for (const [ i, { value } ] of arr.entries()) {
        sum += (box + 1) * (i + 1) * value;
    }
}

console.log(sum);