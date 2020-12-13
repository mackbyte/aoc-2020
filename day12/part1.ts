import {getInputLines} from "../common/inputUtils";
import {
    Direction,
    directions,
    getInstructionType, instructionRegex,
    InstructionType,
    isDirection, move,
    numDirections,
    toVector,
    Turn, Vector2D
} from "./index";

function turn(direction: Direction, turn: Turn, degrees: number): Direction {
    if (turn === Turn.FORWARD) {
        return direction;
    }

    const amount = degrees / 90;
    const start = directions.findIndex(d => d === direction);
    let change = amount * (turn === Turn.LEFT ? -1 : 1);
    // Mod floor to wrap negative indexes as well as positive ones
    return directions[(((start + change) % numDirections) + numDirections) % numDirections]
}

export default function part1(): number {
    const instructions = getInputLines(12);
    let _,
        code: string,
        valueText: string,
        value: number,
        instructionType: InstructionType,
        instructionTurn: Turn,
        start: Vector2D = {
            x: 0,
            y: 0
        },
        position: Vector2D = {
            x: 0,
            y: 0
        },
        direction: Direction = Direction.EAST;

    for (let line of instructions) {
        [_, code, valueText] = line.match(instructionRegex);
        instructionType = getInstructionType(code);
        value = parseInt(valueText);
        if (isDirection(instructionType)) {
            position = move(position, instructionType as Direction, value);
        } else {
            instructionTurn = instructionType as Turn;
            if (instructionTurn === Turn.FORWARD) {
                position = move(position, direction, value);
            } else {
                direction = turn(direction, instructionTurn, value);
            }
        }
    }

    return Math.abs(position.x - start.x) + Math.abs(position.y - start.y);
}