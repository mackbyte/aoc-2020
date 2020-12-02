import part1 from "./part1";
import part2 from "./part2";

export interface Policy {
    min: number,
    max: number,
    letter: string
}

export function extractPolicy(policyString): Policy {
    const policyRegex = /(\d+)-(\d+) (\w)/
    const groups = policyString.match(policyRegex);
    const [_, minStr, maxStr, letter] = groups;
    return {
        min: parseInt(minStr),
        max: parseInt(maxStr),
        letter
    }
}

export default {
    part1,
    part2
}