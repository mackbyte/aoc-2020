import {readFileSync} from 'fs';
import {resolve} from "path";

function getInputLines(day: number): string[] {
    return readFileSync(resolve(__dirname, `../day${day}/input`), 'utf8')
        .split("\n")
        .filter(value => !!value.trim())
}

// TODO fix last line having trailing \n - causes day 4 part 2 to give wrong answer
function getInputSplitByBlankLines(day: number): string[] {
    return readFileSync(resolve(__dirname, `../day${day}/input`), 'utf8')
        .split("\n\n")
        .filter(value => !!value.trim())
}

export {
    getInputLines,
    getInputSplitByBlankLines
}