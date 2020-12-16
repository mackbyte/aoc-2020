import part1 from "./part1";
import part2 from "./part2";
import {getInputLines} from "../common/inputUtils";

export function numbersGame(gameLength: number): number {
    const spokenPositions: Map<number, number> = new Map<number, number>()
    const startingNumbers: number[] = getInputLines(15)[0].split(',').map(number => parseInt(number));
    startingNumbers.slice(0, startingNumbers.length-1).forEach((value, index) => {
        spokenPositions.set(value, index+1);
    })

    let current: number = startingNumbers[startingNumbers.length-1];
    let position: number = startingNumbers.length;
    let difference;
    while (position < gameLength) {
        if(!spokenPositions.has(current)) {
            spokenPositions.set(current, position++);
            current = 0;
        } else {
            difference = position - spokenPositions.get(current);
            spokenPositions.set(current, position++);
            current = difference;
        }
    }

    return current;
}

export default {
    part1,
    part2
}