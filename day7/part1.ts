import {getInputLines} from "../common/inputUtils";

const allBags: Map<string, Bag> = new Map<string, Bag>();

interface BagLink {
    to: Bag
    amount: number
}

interface Bag {
    color: string;
    inside: BagLink[]
}

function getOrCreateBag(containerBagColor: string): Bag {
    let containerBag = allBags.get(containerBagColor);
    if (!containerBag) {
        containerBag = {
            color: containerBagColor,
            inside: []
        }
        allBags.set(containerBagColor, containerBag);
    }
    return containerBag;
}

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

const bagDescriptorRegex = /(\d+) (.+) bags?.?/
export default function part1(): number {
    const lines = getInputLines(7);

    for (let line of lines) {
        const [containerBagColor, containedBags] = line.split(" bags contain ");
        const containerBag = getOrCreateBag(containerBagColor);
        const bagDescriptors = containedBags.split(",");
        for (let bagDescriptor of bagDescriptors) {
            if (bagDescriptor.trim() !== "no other bags.") {
                const [_, amount, color] = bagDescriptor.trim().match(bagDescriptorRegex);
                const bagInside = getOrCreateBag(color)
                bagInside.inside.push({
                    to: containerBag,
                    amount: parseInt(amount)
                });
            }
        }
    }

    const uniqueBagColors: Set<string> = new Set<string>();
    const shinyBag = allBags.get("shiny gold");

    return insideBags(uniqueBagColors, shinyBag).length;
}