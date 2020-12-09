import {getInputLines} from "../common/inputUtils";

function findRange(numbers: number[], target: number): number[] {
    let sum = 0;
    let range: number[] = [];

    for(let num of numbers) {
        sum += num;
        range.push(num);
        if(sum === target) {
            return range;
        } else if(sum > target) {
            return null;
        }
    }
    return null;
}

// Answer to Part 1
const TARGET = 69316178;
export default function part2(): number {
    const numbers = getInputLines(9).map(numStr => parseInt(numStr));

    let range: number[];
    for(let i = 0; i < numbers.length; i++) {
        range = findRange(numbers.slice(i), TARGET);
        if(range) {
            return Math.min(...range) + Math.max(...range);
        }
    }

    return -1;
}