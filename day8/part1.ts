import {getInputLines} from "../common/inputUtils";
import {processInstructions} from "./index";

export default function part1(): number {
    const instructions = getInputLines(8);
    return processInstructions(instructions).acc;
}