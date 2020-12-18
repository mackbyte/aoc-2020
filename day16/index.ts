import part1 from "./part1";
import part2 from "./part2";

export const ruleRegex = /(.+): (\d+)-(\d+) or (\d+)-(\d+)/

export function inRange(value:number, start: number, end: number): boolean {
    return value >= start && value <= end;
}

interface Range {
    from: number,
    to: number
}

export interface Rule {
    name: string,
    rangeOne: Range
    rangeTwo: Range
}

export interface Ticket {
    numbers: number[]
}

export function getRules(ruleTexts: string) {
    return ruleTexts.split("\n").map(ruleText => {
        const [, name, from1, to1, from2, to2] = ruleText.match(ruleRegex)
        return {
            name,
            rangeOne: {
                from: parseInt(from1),
                to: parseInt(to1)
            },
            rangeTwo: {
                from: parseInt(from2),
                to: parseInt(to2)
            }
        }
    });
}

export default {
    part1,
    part2
}