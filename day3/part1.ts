import {getInputLines} from "../common/inputUtils";
import {position, Slope} from "./index";

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