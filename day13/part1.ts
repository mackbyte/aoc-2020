import {getInputLines} from "../common/inputUtils";

export default function part1(): number {
    const [timestamp, busIds]: string[] = getInputLines(13);
    const earliestDepartureTime: number = parseInt(timestamp)
    const busIdsInService: number[] = busIds.split(",").filter(id => id !== 'x').map(id => parseInt(id))

    let earliestBusId: number = busIdsInService
        .map(id => ({id, nextService: id - (earliestDepartureTime % id)}))
        .reduce(
            (earliest, current) =>
                current.nextService < earliest.nextService ? current : earliest, {
                id: -1,
                nextService: Number.MAX_VALUE
            }
        ).id
    return earliestBusId * (earliestBusId - (earliestDepartureTime % earliestBusId));
}