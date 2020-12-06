import {getInputSplitByBlankLines} from "../common/inputUtils";
import {groupQuestionsAnswered} from "./index";

function countQuestionsEveryoneAnswered(groupAnswers: Array<Set<string>>): number {
    let everyoneAnswered: Set<string> = groupAnswers[0];
    for(let i = 1; i < groupAnswers.length; i++) {
        everyoneAnswered = new Set([...everyoneAnswered].filter(answer => groupAnswers[i].has(answer)));
    }
    return everyoneAnswered.size;
}

export default function part2(): number {
    const groups = getInputSplitByBlankLines(6);
    let total = 0;
    for(let group of groups) {
        total += countQuestionsEveryoneAnswered(groupQuestionsAnswered(group.trim()));
    }

    return total;
}