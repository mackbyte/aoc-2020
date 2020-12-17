import {getInputSplitByBlankLines} from "../common/inputUtils";

const ruleRegex = /(.+): (\d+)-(\d+) or (\d+)-(\d+)/

function inRange(value:number, start: number, end: number): boolean {
    return value >= start && value <= end;
}

interface Range {
    from: number,
    to: number
}

interface Rule {
    name: string,
    rangeOne: Range
    rangeTwo: Range
}

interface Ticket {
    numbers: number[]
}

export default function part1(): number {
    const [ruleTexts, myTicketTexts, otherTicketTexts] = getInputSplitByBlankLines(16);

    const rules: Rule[] = ruleTexts.split("\n").map(ruleText => {
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

    const otherTickets: Ticket[] = otherTicketTexts.split("\n").slice(1).map(ticketText => ({
        numbers: ticketText.split(",").map(num => parseInt(num))
    }))

    const invalidNums: number[] = [];

    for(let ticket of otherTickets) {
        for(let num of ticket.numbers) {
            if(rules.every(rule =>
                !inRange(num, rule.rangeOne.from, rule.rangeOne.to) && !inRange(num, rule.rangeTwo.from, rule.rangeTwo.to)
            )) {
                invalidNums.push(num)
            }
        }
    }

    return invalidNums.reduce((total, num) => total + num, 0);
}