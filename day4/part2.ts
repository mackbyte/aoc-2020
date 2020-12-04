import {getInputSplitByBlankLines} from "../common/inputUtils";
import {Passport, Credential} from "./index";

function inRange(value:number, start: number, end: number): boolean {
    return value >= start && value <= end;
}

const heightRegex = /(\d+)(cm|in)/
function heightValidator(value: string): boolean {
    if(!heightRegex.test(value)) { return false }

    const [_, heightStr, unit] = value.match(heightRegex);
    const height = parseInt(heightStr);
    if(unit === "cm") {
        return inRange(height, 150, 193);
    } else {
        return inRange(height, 59, 76);
    }
}

export class CredentialValidator {
    static validators: Map<string, (string) => boolean> = new Map<string, (string) => boolean>([
        [
            "byr",
            value => inRange(parseInt(value), 1920, 2002)
        ],
        [
            "iyr",
            value => inRange(parseInt(value), 2010, 2020)
        ],
        [
            "eyr",
            value => inRange(parseInt(value), 2020, 2030)
        ],
        [
            "hgt",
            heightValidator
        ],
        [
            "hcl",
            value => /#[0-9a-f]{6}/.test(value)
        ],
        [
            "ecl",
            value => /(amb|blu|brn|gry|grn|hzl|oth)/.test(value)
        ],
        [
            "pid",
            value => /\d{9}/.test(value)
        ],
        [
            "cid",
            value => true
        ]
    ])

    public static isValid(credential: Credential): boolean {
        let validator = this.validators.get(credential.id);
        return validator && validator(credential.value);
    }
}

export default function part2(): number {
    const passportStrings = getInputSplitByBlankLines(4);
    let valid = 0;
    let passport: Passport;
    for (let passportString of passportStrings) {
        passport = new Passport(passportString);
        if (passport.hasValidCredentialIdsAndValues()) {
            valid++;
        }
    }
    return valid;
}