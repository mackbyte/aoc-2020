import part1 from "./part1"
import part2 from "./part2"

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

export interface position {
    x,
    y
}

export class Slope {
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

export default {
    part1,
    part2
}