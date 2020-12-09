import part1 from "./part1";
import part2 from "./part2";

let instructionsRun: Set<number> = new Set<number>();
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

export const instructionRegex = /(acc|jmp|nop) ([-+]\d+)/
export function processInstructions(instructions: string[]): ProgramResult {
    instructionsRun = new Set<number>();
    acc = 0;

    let _, instruction, argument;
    let line = 0;
    while (line > -1 && line !== instructions.length) {
        [_, instruction, argument] = instructions[line].match(instructionRegex);
        line = processInstruction(line, instruction, parseInt(argument));
    }
    return {
        acc,
        line
    };
}

export interface ProgramResult {
    acc: number,
    line: number
}

export default {
    part1,
    part2
}