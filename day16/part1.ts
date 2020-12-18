import {getInputSplitByBlankLines} from "../common/inputUtils";
import {getRules, inRange, Rule, ruleRegex, Ticket} from "./index";

export default function part1(): number {
    const [ruleTexts, _, otherTicketTexts] = getInputSplitByBlankLines(16);

    const rules: Rule[] = getRules(ruleTexts);

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