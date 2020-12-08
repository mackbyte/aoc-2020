import part1 from "./part1";
import part2 from "./part2"

export const allBags: Map<string, Bag> = new Map<string, Bag>();

export interface BagLink {
    to: Bag
    amount: number
}

export interface Bag {
    color: string;
    inside: BagLink[]
    contains: BagLink[]
}

function getOrCreateBag(containerBagColor: string): Bag {
    let containerBag = allBags.get(containerBagColor);
    if (!containerBag) {
        containerBag = {
            color: containerBagColor,
            inside: [],
            contains: []
        }
        allBags.set(containerBagColor, containerBag);
    }
    return containerBag;
}

const bagDescriptorRegex = /(\d+) (.+) bags?.?/
export function createBagGraph(lines: string[]) {
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
                containerBag.contains.push({
                    to: bagInside,
                    amount: parseInt(amount)
                });
            }
        }
    }
}

export default {
    part1,
    part2
}