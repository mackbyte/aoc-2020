import day1 from './day1'
import day2 from './day2'

const parts = [
    [
        day1.part1,
        day1.part2
    ],
    [
        day2.part1
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