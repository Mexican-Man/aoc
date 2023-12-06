const firstDigit = /([0-9])/gi;

const replacers = [
    [ 'one', '1' ],
    [ 'two', '2' ],
    [ 'three', '3' ],
    [ 'four', '4' ],
    [ 'five', '5' ],
    [ 'six', '6' ],
    [ 'seven', '7' ],
    [ 'eight', '8' ],
    [ 'nine', '9' ],
];

const testInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const digits1 = testInput.split('\n').map(str => {
    const matches = str.match(firstDigit) ?? [ "0", "0" ];
    if (!matches) throw new Error(`No digit found in ${ str }`);
    return [ matches[ 0 ], matches.pop() ];
});

const result1 = digits1.map(([ a, b ]) => parseInt((a ?? '0') + (b ?? '0'))).reduce((a, b) => a + b, 0);

console.log(result1);

const digits2 = testInput.split('\n').map(str => {
    let newStr = str;

    /** @type Array<string> */
    let numbers = [];

    for (let i = 0; i < str.length; i++) {
        const char = str[ i ];
        if (char.match(/[0-9]/)) {
            numbers.push(char);
        }
        for (const [ key, value ] of replacers) {
            if (str.startsWith(key, i)) {
                numbers.push(value);
            }
        }
    }

    if (!numbers) throw new Error(`No digit found in ${ newStr }`);
    return [ numbers[ 0 ], numbers.pop() ];
});

const result2 = digits2.map(([ a, b ]) => parseInt((a ?? '0') + (b ?? '0'))).reduce((a, b) => a + b, 0);

console.log(result2);