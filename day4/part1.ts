import {getInputSplitByBlankLines} from "../common/inputUtils";
import {Passport} from "./index";

export default function part1(): number {
    const passportStrings = getInputSplitByBlankLines(4);
    let valid = 0;
    let passport: Passport;
    for(let passportString of passportStrings) {
        passport = new Passport(passportString);
        if(passport.hasValidCredentialIds()) {
            valid++;
        }
    }
    return valid;
}