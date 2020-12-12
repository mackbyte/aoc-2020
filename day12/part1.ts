import {getInputLines} from "../common/inputUtils";

enum Direction {
    NORTH = "N",
    EAST = "E",
    SOUTH = "S",
    WEST = "W"
}

enum Turn {
    LEFT = "L",
    RIGHT = "R",
    FORWARD = "F"
}

type InstructionType = Direction | Turn;

const getInstructionType = (code: string): InstructionType => ({
    "N": Direction.NORTH,
    "S": Direction.SOUTH,
    "E": Direction.EAST,
    "W": Direction.WEST,
    "L": Turn.LEFT,
    "R": Turn.RIGHT,
    "F": Turn.FORWARD
})[code];

function isDirection(instructionType: InstructionType): boolean {
    return Object.values(Direction).includes(instructionType as Direction);
}

const directions: Direction[] = [
    Direction.NORTH,
    Direction.EAST,
    Direction.SOUTH,
    Direction.WEST
]
const numDirections = directions.length;

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

function toVector(direction: Direction) {
    switch (direction) {
        case Direction.NORTH:
            return {x: 0, y: -1}
        case Direction.EAST:
            return {x: 1, y: 0}
        case Direction.SOUTH:
            return {x: 0, y: 1}
        case Direction.WEST:
            return {x: -1, y: 0}

    }
}

function move(position: Vector2D, direction: Direction, amount: number): Vector2D {
    let moveVector = toVector(direction);
    return {
        x: position.x + (moveVector.x * amount),
        y: position.y + (moveVector.y * amount)
    }
}

interface Vector2D {
    x: number,
    y: number
}

const instructionRegex = /(\w)(\d+)/;

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
                direction = turn(direction, instructionType as Turn, value);
            }
        }
    }

    return Math.abs(position.x - start.x) + Math.abs(position.y - start.y);
}