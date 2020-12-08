import {getInputLines} from "../common/inputUtils";
import {allBags, Bag, createBagGraph} from "./index";

export function containsBags(bag: Bag): number {
    if(bag.contains.length === 0) {
        return 1;
    }

    return 1 + bag.contains.reduce((total, link) => {
        return total + (link.amount * containsBags(link.to));
    }, 0);
}


export default function part2(): number {
    const lines = getInputLines(7);
    createBagGraph(lines);

    const shinyBag = allBags.get("shiny gold");

    return containsBags(shinyBag) - 1;
}