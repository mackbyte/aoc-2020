import part1 from "./part1";
import part2 from "./part2";

export enum Position {
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

export type ChangerFunction = (x: number, y: number, current: Floor, next: Floor) => void;

export function countAdjacentOccupied(seats: Position[][]): number {
    return seats.reduce(
        (total, row) => total +
            row.reduce((rowTotal, position) => rowTotal +
                (position === Position.OCCUPIED_SEAT ? 1 : 0)
                , 0)
        , 0)
}

export class Floor {
    private readonly floorLayout: string[] = [];

    constructor(floorLayout: string[]) {
        this.floorLayout = floorLayout;
    }

    public setPosition(y: number, x: number, position: Position): void {
        this.floorLayout[y] = this.floorLayout[y].substr(0, x) + position + this.floorLayout[y].substr(x + 1);
    }

    private getRow(y: number) {
        return this.floorLayout[y]
    }

    public getPosition(y: number, x: number): Position {
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

    public processChanges(changer: ChangerFunction): Floor {
        const next = this.clone();

        for (let y = 0; y < this.floorLayout.length; y++) {
            for (let x = 0; x < this.floorLayout[y].length; x++) {
                changer(y, x, this, next);
            }
        }

        return next;
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

export function fillSeatsUntilNoChanges(current: Floor, changer: ChangerFunction): number {
    let hasChanged: boolean = true;
    let next: Floor;
    while (hasChanged) {
        next = current.processChanges(changer)
        hasChanged = current.hasChanged(next)
        current = next;
    }
    return current.countOccupied();
}

export default {
    part1,
    part2
}