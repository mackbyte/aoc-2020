import {getInputLines} from "../common/inputUtils";
import {ChangerFunction, countAdjacentOccupied, fillSeatsUntilNoChanges, Floor, Position} from "./index";

function getAdjacent(y: number, x: number, floor: Floor): Position[][] {
    return [
        [floor.getPosition(y - 1, x - 1), floor.getPosition(y - 1, x), floor.getPosition(y - 1, x + 1)],
        [floor.getPosition(y, x - 1), floor.getPosition(y, x + 1)],
        [floor.getPosition(y + 1, x - 1), floor.getPosition(y + 1, x), floor.getPosition(y + 1, x + 1)]
    ]
}

const neighbouringSeats: ChangerFunction = (y: number, x: number, current: Floor, next: Floor) => {
    let adjacent: Position[][] = getAdjacent(y, x, current);
    let numAdjacentOccupied = countAdjacentOccupied(adjacent);
    if (current.getPosition(y, x) === Position.EMPTY_SEAT && numAdjacentOccupied === 0) {
        next.setPosition(y, x, Position.OCCUPIED_SEAT);
    } else if (current.getPosition(y, x) === Position.OCCUPIED_SEAT && numAdjacentOccupied > 3) {
        next.setPosition(y, x, Position.EMPTY_SEAT);
    }
}

export default function part1(): number {
    const rows = getInputLines(11);
    const floor: Floor = new Floor(rows)
    return fillSeatsUntilNoChanges(floor, neighbouringSeats);
}