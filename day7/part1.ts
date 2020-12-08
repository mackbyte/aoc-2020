import {getInputLines} from "../common/inputUtils";
import {allBags, Bag, createBagGraph} from "./index";

function insideBags(uniqueBagColors: Set<string>, container: Bag): Bag[] {
    if(container.inside.length === 0) {
        return []
    }

    const bags: Bag[] = [];
    for(let link of container.inside) {
        if(!uniqueBagColors.has(link.to.color)) {
            bags.push(link.to);
            uniqueBagColors.add(link.to.color);
        }
        bags.push(...insideBags(uniqueBagColors, link.to));
    }

    return bags;
}

export default function part1(): number {
    const lines = getInputLines(7);
    createBagGraph(lines);

    const uniqueBagColors: Set<string> = new Set<string>();
    const shinyBag = allBags.get("shiny gold");

    return insideBags(uniqueBagColors, shinyBag).length;
}