const input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const games = input.split('\n').map((game) => {
    const [ gameNumber, rounds ] = game.split(': ');
    return {
        gameNumber: parseInt(gameNumber.replace('Game ', '')),
        rounds: rounds.split('; ').map((round) => round.split(', ').map((str) => ({ colour: str.split(' ')[ 1 ], count: parseInt(str.split(' ')[ 0 ]) }))),
    };
});

let total = 0;
let power = 0;

for (const game of games) {
    let possible = true;
    let redMin = 0, blueMin = 0, greenMin = 0;

    for (const round of game.rounds) {
        let red = 0, blue = 0, green = 0;
        for (const ball of round) {
            switch (ball.colour) {
                case 'red':
                    red += ball.count;
                    redMin = Math.max(redMin, ball.count);
                    break;
                case 'blue':
                    blue += ball.count;
                    blueMin = Math.max(blueMin, ball.count);
                    break;
                case 'green':
                    green += ball.count;
                    greenMin = Math.max(greenMin, ball.count);
                    break;
            }
        }
        if (red > 12 || blue > 14 || green > 13) {
            possible = false;
        }
    }
    power += redMin * blueMin * greenMin;

    if (possible) {
        total += game.gameNumber;
    }
}

console.log(total);
console.log(power);
