const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

class CustomMap {
    /** @type Array<[number,number,number]> */
    conditions = new Array();

    /**
     * @param {number} value
     * @returns {number | null}
     */
    get (value) {
        let left = 0;
        let right = this.conditions.length - 1;

        while (left <= right) {
            const middle = Math.floor((left + right) / 2);
            const [ start, range, result ] = this.conditions[ middle ];

            if (value >= start && value < start + range) {
                return result + (value - start);
            } else if (value < start) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }

        return null;
    }

    /**
     * @param {number} start
     * @param {number} range
     * @param {number} result
     */
    set (start, range, result) {
        this.conditions.push([ start, range, result ]);
        this.conditions.sort(([ startA ], [ startB ]) => startA - startB);
    }
}

class CustomArray {
    /** @type Array<[number, number]> */
    conditions = new Array();

    /**
     * @param {number} start
     * @param {number} range
     * @returns {void}
     */
    push (start, range) {
        this.conditions.push([ start, range ]);
    }

    [ Symbol.iterator ] () {
        let index = 0;
        let offset = 0;
        const conditions = this.conditions.sort(([ startA ], [ startB ]) => startA - startB);

        return {
            next: () => {
                const [ start, range ] = conditions[ index ];
                const result = start + offset;

                if (offset < range - 1) {
                    offset++;
                } else {
                    index++;
                    offset = 0;
                }

                return {
                    value: result,
                    done: index >= conditions.length
                };
            }
        };
    };
}

/** @type Array<number> */
const seeds = new Array(),
    /** @type CustomMap*/
    seedToSoilMap = new CustomMap(),
    /** @type CustomMap*/
    soilToFertilizerMap = new CustomMap(),
    /** @type CustomMap*/
    fertilizerToWaterMap = new CustomMap(),
    /** @type CustomMap*/
    waterToLightMap = new CustomMap(),
    /** @type CustomMap*/
    lightToTemperatureMap = new CustomMap(),
    /** @type CustomMap*/
    temperatureToHumidityMap = new CustomMap(),
    /** @type CustomMap*/
    humidityToLocationMap = new CustomMap();

const maps = [
    seedToSoilMap,
    soilToFertilizerMap,
    fertilizerToWaterMap,
    waterToLightMap,
    lightToTemperatureMap,
    temperatureToHumidityMap,
    humidityToLocationMap
];

// Get seeds
const parsed = input
    .split('\n')[ 0 ]
    .split(':')[ 1 ]
    .trim()
    .split(' ')
    .map(Number);
seeds.push(...parsed);

/** @param {Array<number>|CustomArray} seeds  */
const doThing = (seeds) => {
    for (const section of input.split('\n\n')) {
        let [ key, ...lines ] = section.split('\n');
        /** @type CustomMap*/
        let map;

        // Remove : from key
        key = key.slice(0, -1);

        if (key.startsWith('seeds:')) continue;

        switch (key) {
            case 'seed-to-soil map':
                map = seedToSoilMap;
                break;
            case 'soil-to-fertilizer map':
                map = soilToFertilizerMap;
                break;
            case 'fertilizer-to-water map':
                map = fertilizerToWaterMap;
                break;
            case 'water-to-light map':
                map = waterToLightMap;
                break;
            case 'light-to-temperature map':
                map = lightToTemperatureMap;
                break;
            case 'temperature-to-humidity map':
                map = temperatureToHumidityMap;
                break;
            case 'humidity-to-location map':
                map = humidityToLocationMap;
                break;
            default:
                throw new Error(`Unknown section: ${ key }`);
        }

        for (const line of lines) {
            const [ dstRange, srcRange, length ] = line.split(' ').map(Number);

            map.set(srcRange, length, dstRange);
        }
    }

    // const locations = new Set();
    let lowest = Infinity;

    let i = 0;
    for (const seed of seeds) {
        let value = seed;
        for (const map of maps) {
            const nextValue = map.get(value) ?? value;
            if (nextValue !== null) {
                value = nextValue;
            }
        }

        lowest = Math.min(lowest, value);
        i++;
    }

    return lowest;
};

// Part 1

console.time('Part 1');
console.log(doThing(seeds));
console.timeEnd('Part 1');

// Part 2

// Get seeds
console.time('Part 2');
const seeds2 = new CustomArray();
for (let i = 0; i < parsed.length; i += 2) {
    seeds2.push(parsed[ i ], parsed[ i + 1 ]);
}

console.log(doThing(seeds2));
console.timeEnd('Part 2');