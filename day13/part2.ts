import {getInputLines} from "../common/inputUtils";
import {BusService} from "./index";

interface PotentialBusServiceOffset {
    id: string,
    offset: number
}

function toPotentialBusServiceOffset(id: string, offset: number) {
    return {
        id,
        offset
    }
}

interface BusServiceOffset extends BusService {
    offset: number
}

function toBusServiceOffset(service: PotentialBusServiceOffset): BusServiceOffset {
    return {
        id: parseInt(service.id),
        offset: service.offset
    }
}

export default function part2(): number {
    const [, busIds]: string[] = getInputLines(13);
    const busServiceOffsets = busIds.split(",")
        .map((id, index) => toPotentialBusServiceOffset(id, index))
        .filter(potentialBusService => potentialBusService.id !== 'x')
        .map(toBusServiceOffset);

    // Chinese remainder theorem
    let time = busServiceOffsets[0].id
    let step = busServiceOffsets[0].id
    for(let busServiceOffset of busServiceOffsets.slice(1)) {
        while((time + busServiceOffset.offset) % busServiceOffset.id !== 0) {
            time += step;
        }
        step *= busServiceOffset.id
    }
    return time;
}
