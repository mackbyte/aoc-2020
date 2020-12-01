import { getInputLines } from "../common/inputUtils";

export default function part1(): number {
    const lines = getInputLines(1)

    let first;
    let second;
    outer: for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines.length; j++) {
            first = parseInt(lines[i]);
            second = parseInt(lines[j]);
            if (first + second === 2020) {
                break outer;
            }
        }
    }
    return first * second;
}