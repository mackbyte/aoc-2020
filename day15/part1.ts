import {getInputLines} from "../common/inputUtils";

export default function part1(): number {
    const numbers: number[] = getInputLines(15)[0].split(',').map(value => parseInt(value))
    const spoken: Map<number, number> = new Map<number, number>()

    for (let num of numbers) {
        spoken.set(num, 1);
    }

    let last;
    let count;
    let difference;
    while (numbers.length < 2020) {
        last = numbers[numbers.length - 1]
        if (spoken.has(last)) {
            count = spoken.get(last)
            if (count === 1) {
                numbers.push(0)
                spoken.set(0, (spoken.get(0) || 0) + 1);
            } else {
                difference = numbers.length - 1 - numbers.slice(0, numbers.length - 1).lastIndexOf(last);
                numbers.push(difference)
                spoken.set(difference, (spoken.get(difference) || 0) + 1)
            }
        } else {
            numbers.push(0)
            spoken.set(0, (spoken.get(0) || 0) + 1);
        }
    }

    return numbers.pop();
}