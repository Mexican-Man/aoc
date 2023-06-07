using System;
using System.Linq;

namespace AOC
{
    class Day1
    {
        static void Main(string[] args)
        {
            var input = System.IO.File.ReadAllText("../../input/1.txt");
            var split = input
                .ReplaceLineEndings("\n")
                .Split("\n\n");
            var sums = split
                .Where((s) => s != "\n")
                .Select((s) => Array.ConvertAll(s.Split("\n"), int.Parse).Sum())
                .ToArray();

            Array.Sort(sums);
            var len = sums.Length;
            Console.WriteLine("Part 1: {0}", sums[len - 1]);
            Console.WriteLine("Part 2: {0}", sums[len - 1] + sums[len - 2] + sums[len - 3]);
        }
    }
}