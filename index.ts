import day1 from './day1';
import day2 from './day2';
import day3 from './day3';
import day4 from './day4';
import day5 from './day5';

const parts = [
    [
        day1.part1,
        day1.part2
    ],
    [
        day2.part1,
        day2.part2
    ],
    [
        day3.part1,
        day3.part2
    ],
    [
        day4.part1,
        day4.part2
    ],
    [
        day5.part1,
        day5.part2
    ]
]

if(process.argv.length !== 4) {
    console.log("Usage: npm start [day] [part]")
    process.exit(1)
}

const [_, __, day, part] = process.argv;

const dayNum = parseInt(day) - 1,
    partNum = parseInt(part) - 1;

console.log(parts[dayNum][partNum]());