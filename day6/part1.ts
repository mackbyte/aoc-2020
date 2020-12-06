import {getInputSplitByBlankLines} from "../common/inputUtils";
import {groupQuestionsAnswered} from "./index";

function combineGroupAnswers(groupAnswers: Array<Set<string>>): Set<string> {
    const combined: Set<string> = new Set<string>();
    groupAnswers.forEach(personAnswers => personAnswers.forEach(combined.add, combined));
    return combined;
}

function countUniqueQuestionsAnswered(groupAnswers: Array<Set<string>>): number {
    return combineGroupAnswers(groupAnswers).size;
}

export default function part1(): number {
    const groups = getInputSplitByBlankLines(6);
    let total = 0;
    for(let group of groups) {
        total += countUniqueQuestionsAnswered(groupQuestionsAnswered(group));
    }

    return total;
}