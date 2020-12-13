import part1 from "./part1";
import part2 from "./part2";

export interface BusService {
    id: number
}

export function toBusService(id: string);
export function toBusService(id: number);
export function toBusService(id: string | number): BusService {
    return typeof id === "number" ? {id} : {id: parseInt(id)}
}

export default {
    part1,
    part2
}