import {getInputLines} from "../common/inputUtils";

function findSum(numbers: number[], target: number): boolean {
    for(let i = 0; i < numbers.length; i++) {
        for(let j = i+1; j < numbers.length; j++) {
            let first = numbers[i];
            let second = numbers[j];
            if(numbers[i] + numbers[j] === target) {
                return true;
            }
        }
    }

    return false;
}

const PREAMBLE_LENGTH = 25;
export default function part1(): number {
    const numbers = getInputLines(9).map(numStr => parseInt(numStr));

    for(let i = PREAMBLE_LENGTH; i < numbers.length; i++) {
        if(!findSum(numbers.slice(i - PREAMBLE_LENGTH, i), numbers[i])) {
            return numbers[i]
        }
    }

    return -1;
}