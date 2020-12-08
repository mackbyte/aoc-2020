import {getInputLines} from "../common/inputUtils";

const instructionsRun: Set<number> = new Set<number>();
let acc = 0;
function processInstruction(line:number, instruction: string, argument: number): number {
    if(instructionsRun.has(line)) {
        return -1;
    }
    instructionsRun.add(line);

    if(instruction === "acc") {
        acc += argument;
        return line+1;
    } else if(instruction === "jmp") {
        return line + argument;
    } else if(instruction === "nop") {
        return line+1;
    }
}

const instructionRegex = /(acc|jmp|nop) ([-+]\d+)/
export default function part1(): number {
    const instructions = getInputLines(8);
    let _, instruction, argument;
    let line = 0;
    while(line > -1) {
        [_, instruction, argument] = instructions[line].match(instructionRegex);
        line = processInstruction(line, instruction, parseInt(argument));
    }
    return acc;
}