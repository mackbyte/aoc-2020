import {getInputLines} from "../common/inputUtils";

enum Space {
    EMPTY = ".",
    TREE = "#"
}

function parseSpace(space: string) : Space {
    if(space === Space.EMPTY) {
        return Space.EMPTY
    } else {
        return Space.TREE
    }
}


class Contour {
    pattern: Space[] = []

    constructor(patternString: string) {
        for(let spaceString of patternString) {
            this.pattern.push(parseSpace(spaceString));
        }
    }

    public getSpaceAt(position): Space {
        return this.pattern[position % this.pattern.length]
    }
}

interface position {
    x,
    y
}

class Slope {
    contours: Contour[] = []

    constructor(patterns: string[]) {
        for(let pattern of patterns) {
            this.contours.push(new Contour(pattern))
        }
    }

    public treesHitWhileTobogganing(start: position, direction: position): number {
        let contour: Contour = this.contours[start.y]
        let treeCount = 0;
        let space: Space;
        while(contour) {
            space = contour.getSpaceAt(start.x);
            if(space === Space.TREE) {
                treeCount++
            }
            start = {
                x: start.x + direction.x,
                y: start.y + direction.y
            }
            contour = this.contours[start.y]
        }
        return treeCount;
    }
}

export default function part1(): number {
    const lines = getInputLines(3);
    const slope = new Slope(lines);
    const start: position = {
        x: 0,
        y: 0
    }
    const direction: position = {
        x: 3,
        y: 1
    }
    return slope.treesHitWhileTobogganing(start, direction)
}