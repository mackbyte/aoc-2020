import { test } from './day1'

const parts = [
    [
        test
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