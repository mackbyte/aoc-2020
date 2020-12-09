import {getInputLines} from "../common/inputUtils";
import {instructionRegex, processInstructions} from "./index";

interface ModifiedInstructionSet {
    instructions: string[],
    modifiedIndex: number
}

const jmpOrNopRegex = /(jmp|nop) (.+)/
function modifyNextInstruction(instructions: string[], index): ModifiedInstructionSet {
    let instruction, command, argument, _;
    while (index < instructions.length) {
        instruction = instructions[index];
        if (jmpOrNopRegex.test(instruction)) {
            [_, command, argument] = instruction.match(instructionRegex);
            return {
                instructions: [
                    ...instructions.slice(0, index),
                    `${flipInstruction(command)} ${argument}`,
                    ...instructions.slice(index + 1, instructions.length)
                ],
                modifiedIndex: index
            }
        }
        index++;
    }
}

const flipInstruction = instruction => ({
    "jmp": "nop",
    "nop": "jmp"
})[instruction]

export default function part2(): number {
    const instructions = getInputLines(8);
    let modifiedIndex = 0;
    let modifiedInstructions;
    let programResult = {
        line: 0,
        acc: 0
    }

    while (programResult.line !== instructions.length) {
        modifiedInstructions = modifyNextInstruction(instructions, modifiedIndex);
        modifiedIndex = modifiedInstructions.modifiedIndex + 1;
        programResult = processInstructions(modifiedInstructions.instructions);
    }

    return programResult.acc;
}