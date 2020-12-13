import {getInputLines} from "../common/inputUtils";
import {
    Direction,
    getInstructionType,
    instructionRegex,
    InstructionType,
    isDirection,
    move,
    Turn,
    Vector2D
} from "./index";

function rotate(position: Vector2D, turn: Turn, degrees: number): Vector2D {
    degrees *= turn === Turn.LEFT ? -1 : 1;
    switch (degrees) {
        case 90:
        case -270:
            return {
                x: position.y,
                y: position.x * -1
            }
        case 180:
        case -180:
            return {
                x: position.x * -1,
                y: position.y * -1
            }
        case 270:
        case -90:
            return {
                x: position.y * -1,
                y: position.x
            }
    }
}

function moveToWayPoint(position: Vector2D, waypoint: Vector2D, value: number): Vector2D {
    return {
        x: position.x + (waypoint.x * value),
        y: position.y + (waypoint.y * value)
    }
}

export default function part2(): number {
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
        waypoint: Vector2D = {
            x: 10,
            y: 1
        };

    for (let line of instructions) {
        [_, code, valueText] = line.match(instructionRegex);
        instructionType = getInstructionType(code);
        value = parseInt(valueText);
        if (isDirection(instructionType)) {
            waypoint = move(waypoint, instructionType as Direction, value);
        } else {
            instructionTurn = instructionType as Turn;
            if (instructionTurn === Turn.FORWARD) {
                position = moveToWayPoint(position, waypoint, value);
            } else {
                waypoint = rotate(waypoint, instructionTurn, value);
            }
        }
    }

    return Math.abs(position.x - start.x) + Math.abs(position.y - start.y);
}