import {getInputLines} from "../common/inputUtils";

enum Position {
    FLOOR = '.',
    EMPTY_SEAT = 'L',
    OCCUPIED_SEAT = '#',
    UNKNOWN = 'X'
}

const getPositionFromCode = (code: string): Position => ({
    ".": Position.FLOOR,
    "L": Position.EMPTY_SEAT,
    "#": Position.OCCUPIED_SEAT,
    "X": Position.UNKNOWN
})[code];

class Floor {
    private readonly floorLayout: string[] = [];

    constructor(floorLayout: string[]) {
        this.floorLayout = floorLayout;
    }

    public setPosition(y: number, x: number, position: Position): void {
        this.floorLayout[y] = this.floorLayout[y].substr(0, x) + position + this.floorLayout[y].substr(x + 1);
    }

    public getRow(y: number) {
        return this.floorLayout[y]
    }

    private getPosition(y: number, x: number): Position {
        if (this.floorLayout[y]) {
            return getPositionFromCode(this.floorLayout[y][x] || 'X')
        }
        return Position.UNKNOWN;
    }

    private clone(): Floor {
        const floorLayoutClone: string[] = [];
        for (let row of this.floorLayout) {
            floorLayoutClone.push(row)
        }
        return new Floor(floorLayoutClone);
    }

    private getAdjacent(y: number, x: number): Position[][] {
        return [
            [this.getPosition(y - 1, x - 1), this.getPosition(y - 1, x), this.getPosition(y - 1, x + 1)],
            [this.getPosition(y, x - 1), this.getPosition(y, x + 1)],
            [this.getPosition(y + 1, x - 1), this.getPosition(y + 1, x), this.getPosition(y + 1, x + 1)]
        ]
    }

    public countAdjacentOccupied(seats: Position[][]): number {
        return seats.reduce(
            (total, row) => total +
                row.reduce((rowTotal, position) => rowTotal +
                    (position === Position.OCCUPIED_SEAT ? 1 : 0)
                    , 0)
            , 0)
    }

    public processChanges(): Floor {
        const clone = this.clone();
        let adjacent: Position[][] = [];
        let numAdjacentOccupied = 0;

        for (let y = 0; y < this.floorLayout.length; y++) {
            for (let x = 0; x < this.floorLayout[y].length; x++) {
                adjacent = this.getAdjacent(y, x);
                numAdjacentOccupied = this.countAdjacentOccupied(adjacent);
                if (this.getPosition(y, x) === Position.EMPTY_SEAT && numAdjacentOccupied === 0) {
                    clone.setPosition(y, x, Position.OCCUPIED_SEAT);
                } else if (this.getPosition(y, x) === Position.OCCUPIED_SEAT && numAdjacentOccupied > 3) {
                    clone.setPosition(y, x, Position.EMPTY_SEAT);
                }
            }
        }

        return clone;
    }

    public hasChanged(other: Floor): boolean {
        for (let y = 0; y < this.floorLayout.length; y++) {
            if (this.getRow(y) !== other.getRow(y)) {
                return true;
            }
        }
        return false;
    }

    public countOccupied(): number {
        return this.floorLayout.reduce((total, row) => total
            + (row.match(new RegExp(Position.OCCUPIED_SEAT, 'g')) || []).length, 0)
    }

    public toString(): string {
        return this.floorLayout.join("\n");
    }
}

function fillSeatsUntilNoChanges(current: Floor): number {
    let hasChanged: boolean = true;
    let next: Floor;
    while (hasChanged) {
        next = current.processChanges()
        hasChanged = current.hasChanged(next)
        current = next;
    }
    return current.countOccupied();
}

export default function part1(): number {
    const rows = getInputLines(11);
    const floor: Floor = new Floor(rows)
    return fillSeatsUntilNoChanges(floor);
}