import {getInputLines} from "../common/inputUtils";
import {ChangerFunction, countAdjacentOccupied, fillSeatsUntilNoChanges, Floor, Position} from "./index";

interface Coordinate {
    x: number,
    y: number
}

function nextCoordinate(start: Coordinate, move: Coordinate): Coordinate {
    return {
        x: start.x + move.x,
        y: start.y + move.y
    }
}

function findNextVisiblePosition(start: Coordinate, floor: Floor, move: Coordinate): Position {
    let nextCoord = nextCoordinate(start, move);
    let position: Position = floor.getPosition(nextCoord.y, nextCoord.x);
    while (position === Position.FLOOR) {
        nextCoord = nextCoordinate(nextCoord, move);
        position = floor.getPosition(nextCoord.y, nextCoord.x);
    }
    return position;
}

function getVisibleSeats(start: Coordinate, floor: Floor): Position[][] {
    return [
        [
            findNextVisiblePosition(start, floor, {x: -1, y: -1}),
            findNextVisiblePosition(start, floor, {x: 0, y: -1}),
            findNextVisiblePosition(start, floor, {x: +1, y: -1}),
        ],
        [
            findNextVisiblePosition(start, floor, {x: -1, y: 0}),
            findNextVisiblePosition(start, floor, {x: +1, y: 0}),
        ],
        [
            findNextVisiblePosition(start, floor, {x: -1, y: +1}),
            findNextVisiblePosition(start, floor, {x: 0, y: +1}),
            findNextVisiblePosition(start, floor, {x: +1, y: +1}),
        ]
    ]
}

const visibleSeats: ChangerFunction = (y: number, x: number, current: Floor, next: Floor) => {
    let adjacent: Position[][] = getVisibleSeats({x, y}, current);
    let numAdjacentOccupied = countAdjacentOccupied(adjacent);
    if (current.getPosition(y, x) === Position.EMPTY_SEAT && numAdjacentOccupied === 0) {
        next.setPosition(y, x, Position.OCCUPIED_SEAT);
    } else if (current.getPosition(y, x) === Position.OCCUPIED_SEAT && numAdjacentOccupied > 4) {
        next.setPosition(y, x, Position.EMPTY_SEAT);
    }
}

export default function part1(): number {
    const rows = getInputLines(11);
    const floor: Floor = new Floor(rows)
    return fillSeatsUntilNoChanges(floor, visibleSeats);
}