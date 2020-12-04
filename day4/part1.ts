import {getInputSplitByBlankLines} from "../common/inputUtils";

interface Credential {
    id: string,
    value: string
}

class Passport {
    credentials: Credential[] = []
    requiredCredentialIds = [
        "byr",
        "iyr",
        "eyr",
        "hgt",
        "hcl",
        "ecl",
        "pid"
    ]

    constructor(passportString) {
        const credentialStrings: string[] = passportString.replace(/\n/g, " ").split(" ");
        let id, value = "";
        for(let credentialString of credentialStrings) {
            [id, value] = credentialString.split(":");
            this.credentials.push({id, value})
        }
    }

    isValid() {
        const credentialIds = this.credentials.map(cred => cred.id);
        return this.requiredCredentialIds.every(id => credentialIds.includes(id));
    }
}

export default function part1(): number {
    const passportStrings = getInputSplitByBlankLines(4);
    let valid = 0;
    let passport: Passport;
    for(let passportString of passportStrings) {
        passport = new Passport(passportString);
        if(passport.isValid()) {
            valid++;
        }
    }
    return valid;
}