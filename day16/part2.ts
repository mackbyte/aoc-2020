import {getInputSplitByBlankLines} from "../common/inputUtils";
import {getRules, inRange, Rule, Ticket} from "./index";

interface ValidTicket {
    ticket: Ticket,
    validations: Map<number, Rule[]>
}

export default function part2(): number {
    const [ruleTexts, myTicketText, otherTicketTexts] = getInputSplitByBlankLines(16);

    const rules: Rule[] = getRules(ruleTexts);

    const otherTickets: Ticket[] = otherTicketTexts.split("\n").slice(1).map(ticketText => ({
        numbers: ticketText.split(",").map(num => parseInt(num))
    }))

    let validTickets: ValidTicket[] = otherTickets.reduce((validTickets, ticket) => {
        const validations: Map<number, Rule[]> = new Map<number, Rule[]>();
        let ticketValid = true;
        for (let i = 0; i < ticket.numbers.length; i++) {
            let atLeastOneValid = false;
            let number = ticket.numbers[i];
            for (let rule of rules) {
                if (inRange(number, rule.rangeOne.from, rule.rangeOne.to)
                    || inRange(number, rule.rangeTwo.from, rule.rangeTwo.to)) {
                    validations.set(i, (validations.get(i) || []).concat(rule))
                    atLeastOneValid = true;
                }
            }
            if (!atLeastOneValid) {
                ticketValid = false;
                break;
            }
        }

        if (ticketValid) {
            validTickets.push({
                ticket,
                validations
            })
        }

        return validTickets;
    }, []);

    let rulesForPosition: Map<string, number> = new Map<string, number>()
    let assignedRules: Set<number> = new Set<number>()
    while(rulesForPosition.size < rules.length) {
        for (let i = 0; i < rules.length; i++) {
            if(assignedRules.has(i)) {
                continue;
            }
            let rulesForCurrentPosition: string[] = rules.filter(rule => !rulesForPosition.has(rule.name)).map(rule => rule.name);
            for (let ticket of validTickets) {
                let rulesForTicketPosition: Set<string> = new Set(ticket.validations.get(i).map(rule => rule.name));
                rulesForCurrentPosition = rulesForCurrentPosition.filter(name => rulesForTicketPosition.has(name))
                if (rulesForCurrentPosition.length === 1) {
                    rulesForPosition.set(rulesForCurrentPosition.pop(), i)
                    assignedRules.add(i)
                    break;
                }
            }
        }
    }

    const myTicket: Ticket = myTicketText.split("\n").slice(1).map(ticketText => ({
        numbers: ticketText.split(",").map(num => parseInt(num))
    }))[0]

    const selectedRulePositions = rules.filter(rule => rule.name.startsWith("departure"))
        .map(rule => rulesForPosition.get(rule.name))

    return selectedRulePositions.reduce((total, rulePos) => total * myTicket.numbers[rulePos], 1)
}