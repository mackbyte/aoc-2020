import { getInputLines } from "../common/inputUtils";
import {extractPolicy, Policy} from "./index";

function validatePassword(policy: Policy, password: string): boolean {
    let minValid = password[policy.min - 1] === policy.letter;
    let maxValid = password[policy.max - 1] === policy.letter;
    return (minValid && !maxValid) || (!minValid && maxValid)
}

export default function part2(): number {
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