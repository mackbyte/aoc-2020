import {getInputLines} from "../common/inputUtils";

const maskRegex = /mask = (.+)/
const memRegex = /mem\[(\d+)] = (\d+)/

function toDecimal(binary: string): number {
    return parseInt(binary, 2);
}

function toBinary(decimal: number): string {
    return (decimal >>> 0).toString(2).padStart(36, "0");
}

function applyMask(binary: string, mask: string): string {
    let result = '';
    for(let i = 0; i < binary.length; i++) {
        result += mask[i] === 'X' ? binary[i] : mask[i]
    }
    return result;
}

export default function part1(): number {
    const lines = getInputLines(14);
    let mask: string = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    let memLocation: string;
    let memValue: string;
    let values: Map<number, number> = new Map<number, number>();
    for(let line of lines) {
        if(maskRegex.test(line)) {
            [, mask] = line.match(maskRegex);
        } else {
            [, memLocation, memValue] = line.match(memRegex)
            values.set(parseInt(memLocation), toDecimal(applyMask(toBinary(parseInt(memValue)), mask)))
        }
    }

    return [...values].reduce((total, [, value]) => total + value, 0);
}