import part1 from './part1'
import part2, {CredentialValidator} from './part2'

export interface Credential {
    id: string,
    value: string
}

export class Passport {
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
        for (let credentialString of credentialStrings) {
            [id, value] = credentialString.split(":");
            this.credentials.push({id, value})
        }
    }

    hasValidCredentialIds(): boolean {
        const credentialIds = this.credentials.map(cred => cred.id);
        return this.requiredCredentialIds.every(id => credentialIds.includes(id));
    }

    hasValidCredentialIdsAndValues(): boolean {
        if(!this.hasValidCredentialIds()) {
            return false
        }

        return this.credentials.every(credential => CredentialValidator.isValid(credential))
    }
}


export default {
    part1,
    part2
}