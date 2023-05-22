import 'dart:io';

void main() {
  final input = File('input/2.txt').readAsStringSync();

  final lines = input.replaceAll('\r\n', '\n').split('\n');
  final matches = lines.map((e) => e.split(' '));

  final results = matches.map((e) => score1(e));
  final total = results.reduce((value, element) => value + element);

  print('Part 1: $total');

  final newResults = matches.map((e) => score2(e));
  final newTotal = newResults.reduce((value, element) => value + element);

  print('Part 2: $newTotal');
}

int score1(List<String> match) {
  var score = 0;

  // Choice bonus
  score += match[1] == 'X'
      ? 1
      : match[1] == 'Y'
          ? 2
          : 3;

  // Match outcome
  if (match[0] == 'A' && match[1] == 'X' ||
      match[0] == 'B' && match[1] == 'Y' ||
      match[0] == 'C' && match[1] == 'Z') {
    // Tie
    score += 3;
  } else if (match[0] == 'A' && match[1] == 'Y' ||
      match[0] == 'B' && match[1] == 'Z' ||
      match[0] == 'C' && match[1] == 'X') {
    // Win
    score += 6;
  } else {
    // Lose
  }

  return score;
}

int score2(List<String> match) {
  var score = 0;

  // Choice bonus
  // score += match[1] == 'X'
  //     ? 1
  //     : match[1] == 'Y'
  //         ? 2
  //         : 3;

  // Match outcome
  score += match[1] == 'X'
      ? 0
      : match[1] == 'Y'
          ? 3
          : 6;

  // Choice bonus
  if (match[0] == 'A' && match[1] == 'X' ||
      match[0] == 'B' && match[1] == 'Z' ||
      match[0] == 'C' && match[1] == 'Y') {
    // Scissors
    score += 3;
  } else if (match[0] == 'A' && match[1] == 'Z' ||
      match[0] == 'B' && match[1] == 'Y' ||
      match[0] == 'C' && match[1] == 'X') {
    // Paper
    score += 2;
  } else {
    // Rock
    score += 1;
  }

  return score;
}
