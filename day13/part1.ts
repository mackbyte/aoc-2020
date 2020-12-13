import {getInputLines} from "../common/inputUtils";
import {BusService, toBusService} from "./index";

interface BusServiceWait extends BusService {
    wait: number
}

function toBusServiceWait(service: BusService, wait: number): BusServiceWait {
    return {
        id: service.id,
        wait
    }
}

export default function part1(): number {
    const [timestamp, busIds]: string[] = getInputLines(13);
    const earliestDepartureTime: number = parseInt(timestamp)
    const busIdsInService: BusService[] = busIds.split(",")
        .filter(id => id !== 'x')
        .map(toBusService)

    let earliestBusId: number = busIdsInService
        .map(service => toBusServiceWait(service, service.id - (earliestDepartureTime % service.id)))
        .reduce(
            (earliest: BusServiceWait, current: BusServiceWait) =>
                current.wait < earliest.wait ? current : earliest,
            toBusServiceWait(toBusService(-1), Number.MAX_VALUE)
        ).id
    return earliestBusId * (earliestBusId - (earliestDepartureTime % earliestBusId));
}