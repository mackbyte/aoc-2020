import {getInputLines} from "../common/inputUtils";
import {calculateTicketId, parseTicketCode} from "./index";

function findTicketIds(ticketIds): number {
    let sortedIds = ticketIds.sort();
    for(let i = 1; i < sortedIds.length; i++) {
        if(sortedIds[i-1] + 2 === sortedIds[i]) {
            return sortedIds[i]-1;
        }
    }
    return -1;
}

export default function part2(): number {
    const ticketCodes = getInputLines(5);
    let ticketIds: number[] = [];

    for (let ticketCode of ticketCodes) {
        ticketIds.push(calculateTicketId(parseTicketCode(ticketCode)));
    }

    return findTicketIds(ticketIds);
}