import part1 from "./part1";
import part2 from "./part2";
import {getInputLines} from "../common/inputUtils";

export function getAdapters() {
    const adapters: number[] = getInputLines(10)
        .map(adapter => parseInt(adapter))
        .sort((a, b) => a - b);

    const wallSocket: number = 0;
    adapters.unshift(wallSocket);

    const myAdapter: number = adapters[adapters.length - 1] + 3;
    adapters.push(myAdapter);
    return adapters;
}

export default {
    part1,
    part2
}