using System;
using System.Linq;

namespace AOC
{
    class Day2
    {
        static void Main(string[] args)
        {
            var input = System.IO.File
                .ReadAllText("../../input/2.txt")
                .ReplaceLineEndings("\n");
            var split = input.Split("\n");
            var parsed = split
                .Select((s) => ((OpponentMove)s[0], (YourMove)s[2]))
                .ToArray();

            var score = 0;
            foreach (var round in parsed)
            {
                if (round.Item1 == OpponentMove.Rock && round.Item2 == YourMove.Paper) { score += 6; }
                else if (round.Item1 == OpponentMove.Rock && round.Item2 == YourMove.Scissors) { score += 0; }
                else if (round.Item1 == OpponentMove.Paper && round.Item2 == YourMove.Rock) { score += 0; }
                else if (round.Item1 == OpponentMove.Paper && round.Item2 == YourMove.Scissors) { score += 6; }
                else if (round.Item1 == OpponentMove.Scissors && round.Item2 == YourMove.Rock) { score += 6; }
                else if (round.Item1 == OpponentMove.Scissors && round.Item2 == YourMove.Paper) { score += 0; }
                else { score += 3; }

                if (round.Item2 == YourMove.Rock) { score += 1; }
                else if (round.Item2 == YourMove.Paper) { score += 2; }
                else { score += 3; }
            }

            Console.WriteLine("Part 1: {0}", score);

            var newParsed = parsed
                .Select((p) => (p.Item1, (Outcome)p.Item2))
                .ToArray();

            var newScore = 0;
            foreach (var round in newParsed)
            {
                switch (round.Item2)
                {
                    case Outcome.Lose:
                        break;
                    case Outcome.Tie:
                        newScore += 3;
                        break;
                    case Outcome.Win:
                        newScore += 6;
                        break;
                }

                if (round.Item1 == OpponentMove.Rock)
                {
                    if (round.Item2 == Outcome.Win) { newScore += 2; }
                    else if (round.Item2 == Outcome.Tie) { newScore += 1; }
                    else { newScore += 3; }
                }
                else if (round.Item1 == OpponentMove.Paper)
                {
                    if (round.Item2 == Outcome.Win) { newScore += 3; }
                    else if (round.Item2 == Outcome.Tie) { newScore += 2; }
                    else { newScore += 1; }
                }
                else
                {
                    if (round.Item2 == Outcome.Win) { newScore += 1; }
                    else if (round.Item2 == Outcome.Tie) { newScore += 3; }
                    else { newScore += 2; }
                }
            }

            Console.WriteLine("Part 2: {0}", newScore);
        }
    }

    enum OpponentMove
    {
        Rock = 'A',
        Paper = 'B',
        Scissors = 'C',
    }

    enum YourMove
    {
        Rock = 'X',
        Paper = 'Y',
        Scissors = 'Z',

    }

    enum Outcome
    {
        Lose = 'X',
        Tie = 'Y',
        Win = 'Z',
    }
}
