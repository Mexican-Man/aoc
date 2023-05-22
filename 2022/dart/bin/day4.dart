import 'dart:io';

void main() {
  final input = File('input/4.txt').readAsStringSync();

  final lines = input.replaceAll('\r\n', '\n').split('\n');
  final linePairs = lines.map((e) => e.split(',')).toList();

  final assignments = linePairs
      .map((e) => e
          .map((e) => Assignment(
              int.parse(e.split('-')[0]), int.parse(e.split('-')[1])))
          .toList())
      .toList();

  final overlaps = assignments
      .where((e) =>
          e[0].start <= e[1].end && e[1].start <= e[0].end ||
          e[1].start <= e[0].end && e[0].start <= e[1].end)
      .toList();

  final totalOverlaps = overlaps
      .where((e) =>
          e[0].start <= e[1].start && e[1].end <= e[0].end ||
          e[1].start <= e[0].start && e[0].end <= e[1].end)
      .toList();

  print('Part 1: ${totalOverlaps.length}');

  print('Part 2: ${overlaps.length}');
}

bool overlaps(Assignment a, Assignment b) {
  return a.start <= b.end && b.start <= a.end ||
      b.start <= a.end && a.start <= b.end;
}

class Assignment {
  final int start;
  final int end;

  Assignment(this.start, this.end);
}
