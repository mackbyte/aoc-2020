import {getInputLines} from "../common/inputUtils";
import {calculateTicketId, parseTicketCode} from "./index";

export default function part1(): number {
    const ticketCodes = getInputLines(5);
    let maxTicketId: number = -1;

    for (let ticketCode of ticketCodes) {
        let ticketId = calculateTicketId(parseTicketCode(ticketCode));
        maxTicketId = maxTicketId > ticketId ? maxTicketId : ticketId;
    }

    return maxTicketId;
}