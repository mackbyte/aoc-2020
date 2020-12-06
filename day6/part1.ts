import {getInputSplitByBlankLines} from "../common/inputUtils";

function personQuestionsAnswered(personAnswers: string): Map<string, number> {
    const answers: Map<string, number> = new Map<string, number>();
    for(let answer of personAnswers) {
        answers.has(answer) ? answers.set(answer, answers.get(answer) + 1) : answers.set(answer, 1);
    }
    return answers;
}

function groupQuestionsAnswered(groupAnswersString: string): Array<Map<string, number>> {
    const questionsAnswered: Array<Map<string, number>> = [];
    const groupAnswers = groupAnswersString.split("\n");
    for(let personAnswers of groupAnswers) {
        questionsAnswered.push(personQuestionsAnswered(personAnswers));
    }
    return questionsAnswered;
}

function combineGroupAnswers(groupAnswers: Array<Map<string, number>>): Map<string, number> {
    const combined: Map<string, number> = new Map<string, number>();
    let answers;
    for(let personAnswers of groupAnswers) {
        answers = personAnswers.keys();
        for(let answer of answers) {
            combined.has(answer) ? combined.set(answer, combined.get(answer) + 1) : combined.set(answer, 1);
        }
    }
    return combined;
}

function countUniqueQuestionsAnswered(groupAnswers: Array<Map<string, number>>): number {
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