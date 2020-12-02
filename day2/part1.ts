import { getInputLines } from "../common/inputUtils";

interface Policy {
    min: number,
    max: number,
    letter: string
}

function extractPolicy(policyString): Policy {
    const policyRegex = /(\d+)-(\d+) (\w)/
    const groups = policyString.match(policyRegex);
    const [_, minStr, maxStr, letter] = groups;
    return {
        min: parseInt(minStr),
        max: parseInt(maxStr),
        letter
    }
}

function countLetter(letter, password): number {
    let count = 0;
    for(let char of password) {
        if(char === letter) {
            count++;
        }
    }
    return count;
}

function validatePassword(policy: Policy, password: string): boolean {
    const count = countLetter(policy.letter, password);
    return count >= policy.min && count <= policy.max
}

export default function part1(): number {
    const lines = getInputLines(2);

    let policy, password;
    let valid = 0;

    for(let line of lines) {
        [policy, password] = line.split(":")
        if(validatePassword(extractPolicy(policy), password.trim())) {
            valid++;
        }
    }

    return valid;
}