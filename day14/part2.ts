import {getInputLines} from "../common/inputUtils";
import {maskRegex, memRegex, toBinary, toDecimal} from "./index";

function applyMask(binary: string, mask: string): string {
    let result = '';
    for(let i = 0; i < binary.length; i++) {
        if(mask[i] === '0') {
            result += binary[i]
        } else if(mask[i] === '1') {
            result += '1'
        } else {
            result += 'X'
        }
    }
    return result;
}

function getAllMemoryAddresses(address: string, mask: string): number[] {
    let maskedAddress = applyMask(address, mask);
    let i = 0;
    let maskedAddresses: string[] = [maskedAddress]
    while(i < maskedAddress.length) {
        if(maskedAddress[i] === 'X') {
            maskedAddresses = maskedAddresses.flatMap(madr => [
                madr.substr(0, i) + '0' + madr.substr(i+1),
                madr.substr(0, i) + '1' + madr.substr(i+1),
            ]);
        }
        i++
    }
    return maskedAddresses.map(toDecimal);
}

export default function part2(): number {
    const lines = getInputLines(14);
    let mask: string = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    let memLocation: string;
    let memValue: string;
    let memoryAddresses: number[] = [];
    let address: number;
    let values: Map<number, number> = new Map<number, number>();

    for(let line of lines) {
        if(maskRegex.test(line)) {
            [, mask] = line.match(maskRegex);
        } else {
            [, memLocation, memValue] = line.match(memRegex)
            memoryAddresses = getAllMemoryAddresses(toBinary(parseInt(memLocation)), mask);
            for(address of memoryAddresses) {
                values.set(address, parseInt(memValue))
            }
        }
    }

    return [...values].reduce((total, [, value]) => total + value, 0);
}
