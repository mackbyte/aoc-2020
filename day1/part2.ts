import {getInputLines} from "../common/inputUtils";

export default function part2(): number {
    const lines = getInputLines(1)

    let first;
    let second;
    let third;
    outer: for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines.length; j++) {
            for (let k = 0; k < lines.length; k++) {
                first = parseInt(lines[i]);
                second = parseInt(lines[j]);
                third = parseInt(lines[k]);
                if (first + second + third === 2020) {
                    break outer;
                }
            }
        }
    }
    return first * second * third;
}