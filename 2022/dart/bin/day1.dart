import 'dart:io';

void main() {
  final input = File('input/1.txt').readAsStringSync();

  final groups = input.replaceAll('\r\n', '\n').split('\n\n');
  final calories = groups.map((e) => e
      .split('\n')
      .map((e) => int.parse(e))
      .reduce((value, element) => value + element));

  final sorted = calories.toList(growable: false);
  sorted.sort((a, b) => b.compareTo(a));

  print('Part 1: ${sorted.first}');

  print('Part 2: ${sorted.sublist(0, 3).reduce((v, e) => v + e)}');
}
