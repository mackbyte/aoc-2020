import part1 from "./part1";
import part2 from "./part2";

export enum Direction {
    NORTH = "N",
    EAST = "E",
    SOUTH = "S",
    WEST = "W"
}

export enum Turn {
    LEFT = "L",
    RIGHT = "R",
    FORWARD = "F"
}

export type InstructionType = Direction | Turn;

export const getInstructionType = (code: string): InstructionType => ({
    "N": Direction.NORTH,
    "S": Direction.SOUTH,
    "E": Direction.EAST,
    "W": Direction.WEST,
    "L": Turn.LEFT,
    "R": Turn.RIGHT,
    "F": Turn.FORWARD
})[code];

export function isDirection(instructionType: InstructionType): boolean {
    return Object.values(Direction).includes(instructionType as Direction);
}

export const directions: Direction[] = [
    Direction.NORTH,
    Direction.EAST,
    Direction.SOUTH,
    Direction.WEST
]
export const numDirections = directions.length;

export function toVector(direction: Direction) {
    switch (direction) {
        case Direction.NORTH:
            return {x: 0, y: 1}
        case Direction.EAST:
            return {x: 1, y: 0}
        case Direction.SOUTH:
            return {x: 0, y: -1}
        case Direction.WEST:
            return {x: -1, y: 0}

    }
}

export interface Vector2D {
    x: number,
    y: number
}

export const instructionRegex = /(\w)(\d+)/;

export function move(position: Vector2D, direction: Direction, amount: number): Vector2D {
    let moveVector = toVector(direction);
    return {
        x: position.x + (moveVector.x * amount),
        y: position.y + (moveVector.y * amount)
    }
}

export default {
    part1,
    part2
}