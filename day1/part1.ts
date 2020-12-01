import {readFileSync} from 'fs';
import {resolve} from "path";

function getInputLines(): string[] {
    // Slice to remove trailing empty line
    return readFileSync(resolve(__dirname, "input"), 'utf8').split("\n").slice(0, -1);
}

export default function part1(): number {
    const lines = getInputLines()

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