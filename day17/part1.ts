import {getInputLines} from "../common/inputUtils";

interface Vector3D {
    x: number,
    y: number,
    z: number
}

function vectorToString(vector: Vector3D): string {
    return `${vector.z},${vector.y},${vector.x}`
}

class Space {
    cubes: Map<string, boolean> = new Map<string, boolean>();
    min: Vector3D = {x: 0, y: 0, z: 0};
    max: Vector3D;

    constructor(spaceLines: string[]) {
        for (let y = 0; y < spaceLines.length; y++) {
            for (let x = 0; x < spaceLines[y].length; x++) {
                this.cubes.set(vectorToString({x, y, z: 0}), spaceLines[y][x] === '#')
            }
        }
        // assuming all lines are same length
        this.max = {x: spaceLines[0].length, y: spaceLines.length, z: 0}
    }

    isCubeActive(vector: Vector3D): boolean {
        return this.cubes.get(vectorToString(vector));
    }

    countActiveNeighbours(vector: Vector3D): number {
        let count = 0;
        for (let z = vector.z - 1; z <= vector.z + 1; z++) {
            for (let y = vector.y - 1; y <= vector.y + 1; y++) {
                for (let x = vector.x - 1; x <= vector.x + 1; x++) {
                    if (this.isCubeActive({x, y, z})) {
                        count++;
                    }
                }
            }
        }
        return this.isCubeActive(vector) ? count - 1 : count;
    }

    cubeNextState(current: boolean, activeNeighbours: number): boolean {
        return activeNeighbours === 3 || (activeNeighbours === 2 && current);
    }

    cycle() {
        const start = {x: this.min.x - 1, y: this.min.y - 1, z: this.min.z - 1}
        const end = {x: this.max.x + 1, y: this.max.y + 1, z: this.max.z + 1}
        const nextCubes: Map<string, boolean> = new Map<string, boolean>();

        for (let z = start.z; z <= end.z; z++) {
            for (let y = start.y; y <= end.y; y++) {
                for (let x = start.x; x <= end.x; x++) {
                    nextCubes.set(vectorToString({x, y, z}),
                        this.cubeNextState(
                            this.isCubeActive({x, y, z}),
                            this.countActiveNeighbours({x, y, z})
                        )
                    )
                }
            }
        }

        this.cubes = nextCubes;
        this.min = start;
        this.max = end;
    }

    countActive(): number {
        let count = 0;
        for (let z = this.min.z; z <= this.max.z; z++) {
            for (let y = this.min.y; y <= this.max.y; y++) {
                for (let x = this.min.x; x <= this.max.x; x++) {
                    if(this.isCubeActive({x, y, z})) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
}

export default function part1(): number {
    const lines = getInputLines(17);
    const space = new Space(lines);
    for (let i = 0; i < 6; i++) {
        space.cycle()
    }

    return space.countActive();
}