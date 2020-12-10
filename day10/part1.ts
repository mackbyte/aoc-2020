import {getInputLines} from "../common/inputUtils";

export default function part1(): number {
    const adapters: number[] = getInputLines(10)
        .map(adapter => parseInt(adapter))
        .sort((a, b) => a - b);

    const wallSocket: number = 0;
    adapters.unshift(wallSocket);

    const myAdapter: number = Math.max(...adapters) + 3;
    adapters.push(myAdapter);

    let oneJolts: number = 0,
        threeJolts: number = 0,
        difference: number = 0;

    for(let i = 1; i < adapters.length; i++) {
        difference = adapters[i] - adapters[i-1]
        if(difference === 1) {
            oneJolts++
        } else if(difference === 3) {
            threeJolts++
        }
    }

    return oneJolts * threeJolts;
}