import part1 from "./part1";
import part2 from "./part2";

function personQuestionsAnswered(personAnswers: string): Set<string> {
    const answers: Set<string> = new Set<string>();
    for(let answer of personAnswers) {
        answers.add(answer)
    }
    return answers;
}

export function groupQuestionsAnswered(groupAnswersString: string): Array<Set<string>> {
    const questionsAnswered: Array<Set<string>> = [];
    const groupAnswers = groupAnswersString.split("\n");
    for(let personAnswers of groupAnswers) {
        questionsAnswered.push(personQuestionsAnswered(personAnswers));
    }
    return questionsAnswered;
}

export default {
    part1,
    part2
}