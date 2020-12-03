import {getInputLines} from "../common/inputUtils";
import {position, Slope} from "./index";

export default function part2(): number {
    const lines = getInputLines(3);
    const slope = new Slope(lines);
    const start: position = {
        x: 0,
        y: 0
    }

    return slope.treesHitWhileTobogganing(start, {x: 1, y: 1})
        * slope.treesHitWhileTobogganing(start, {x: 3, y: 1})
        * slope.treesHitWhileTobogganing(start, {x: 5, y: 1})
        * slope.treesHitWhileTobogganing(start, {x: 7, y: 1})
        * slope.treesHitWhileTobogganing(start, {x: 1, y: 2});
}