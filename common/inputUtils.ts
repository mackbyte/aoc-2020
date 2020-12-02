import {readFileSync} from 'fs';
import {resolve} from "path";

function getInputLines(day: number): string[] {
    // Slice to remove trailing empty line
    return readFileSync(resolve(__dirname, `../day${day}/input`), 'utf8').split("\n").filter(value => !!value.trim())
}

export {
    getInputLines
}