import 'dart:io';

void main() {
  final input = File('input/3.txt').readAsStringSync();

  final lines = input.replaceAll('\r\n', '\n').split('\n');
  final bags = lines
      .map((e) => [
            e.substring(0, (e.length / 2).floor()),
            e.substring((e.length / 2).floor())
          ])
      .toList();

  final overlaps = bags.map((e) => findOverlap([e[0], e[1]]));
  final priorities = overlaps.map((e) => convertToPriority(e));
  final total = priorities.reduce((value, element) => value + element);

  print('Part 1: $total');

  // Group into 3s
  var groups = <List<String>>[];
  for (var i = 0; i < bags.length; i += 3) {
    groups.add([
      bags[i][0] + bags[i][1],
      bags[i + 1][0] + bags[i + 1][1],
      bags[i + 2][0] + bags[i + 2][1]
    ]);
  }

  final groupOverlaps = groups.map((e) => findOverlap(e));
  final groupPriorities = groupOverlaps.map((e) => convertToPriority(e));
  final groupTotal =
      groupPriorities.reduce((value, element) => value + element);

  print('Part 2: $groupTotal');
}

int findOverlap(List<String> strings) {
  final sets = strings.map((e) => e.runes.toSet());
  final overlap = sets.fold(sets.first, (a, b) => a.intersection(b));

  if (overlap.isEmpty) throw Exception('No overlap found');

  return overlap.first;
}

int convertToPriority(int num) {
  return num <= 90 ? num - 38 : num - 96;
}
