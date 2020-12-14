import part1 from "./part1";
import part2 from "./part2";

export const maskRegex = /mask = (.+)/
export const memRegex = /mem\[(\d+)] = (\d+)/

export function toDecimal(binary: string): number {
    return parseInt(binary, 2);
}

export function toBinary(decimal: number): string {
    return (decimal >>> 0).toString(2).padStart(36, "0");
}

export default {
    part1,
    part2
}