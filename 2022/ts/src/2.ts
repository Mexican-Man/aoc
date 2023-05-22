export { };

const input = `A Y
B X
C Z`;

const enum OpMoves {
    Rock = 'A',
    Paper = 'B',
    Scissors = 'C',
};
type OpMove = typeof OpMoves[keyof typeof OpMoves];

enum MyMoves {
    Rock = 'X',
    Paper = 'Y',
    Scissors = 'Z',
};
type MyMove = typeof MyMoves[keyof typeof MyMoves];

const splitInput = input
    .split('\n')
    .map((group) => group
        .split(' ') as [OpMove, MyMove]);

const Score = (opMove: OpMove, myMove: MyMove): number => {
    // Rock = 1, Paper = 2, Scissors = 3
    const moveScore = myMove === MyMoves.Scissors && 3 || myMove === MyMoves.Paper && 2 || 1;

    const opChar = opMove.charCodeAt(0) - 65;
    const myChar = myMove.charCodeAt(0) - 88;

    // Win = 6, Draw = 3, Lose = 0
    const winScore = (opChar === myChar && 3) || ((opChar + 1) % 3 === (myChar) && 6) || 0;

    return moveScore + winScore;
};

const GetMove = (opMove: OpMove, resMove: MyMove): MyMove => {
    const opChar = opMove.charCodeAt(0) - 65;
    const resChar = resMove.charCodeAt(0) - 88; // 0 = Lose, 1 = Draw, 2 = Win

    const myChar = (opChar + resChar + 2) % 3; // 0 + 2 % 3 = 2, Rock vs Scissors. 1 + 2 % 3 = 0, Rock vs Rock. 2 + 2 % 3 = 1, Rock vs Paper. 
    return String.fromCharCode(myChar + 88) as MyMove;
};

const totalScore1 = splitInput.reduce((total, [opMove, myMove]) => total + Score(opMove, myMove), 0);
const totalScore2 = splitInput.reduce((total, [opMove, resultMove]) => total + Score(opMove, GetMove(opMove, resultMove)), 0);

console.log(`Part 1: ${totalScore1}\nPart 2: ${totalScore2}`);