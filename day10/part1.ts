import {getInputLines} from "../common/inputUtils";
import {getAdapters} from "./index";

export default function part1(): number {
    const adapters: number[] = getAdapters()

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