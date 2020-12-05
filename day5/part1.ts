import {getInputLines} from "../common/inputUtils";

const MAX_ROWS: number = 128;
const MAX_COLUMNS: number = 8;

interface Ticket {
    row: number,
    column: number
}

const ticketCodeRegex = /(\w{7})(\w{3})/;

function binaryExtract(encoded: string, min: number, max: number, lower: string) {
    for (let code of encoded) {
        if (code === lower) {
            max -= Math.ceil((max - min) / 2);
        } else {
            min += Math.ceil((max - min) / 2)
        }
    }
    return min;
}

function parseTicketCode(ticketCodeString): Ticket {
    const [_, rowCode, columnCode] = ticketCodeString.match(ticketCodeRegex);
    return {
        row: binaryExtract(rowCode, 0, MAX_ROWS-1, "F"),
        column: binaryExtract(columnCode, 0, MAX_COLUMNS-1, "L")
    }
}

function calculateTicketId(ticket: Ticket): number {
    return (ticket.row * 8) + ticket.column;
}

export default function part1(): number {
    const ticketCodes = getInputLines(5);
    let maxTicketId: number = -1;

    for (let ticketCode of ticketCodes) {
        let ticketId = calculateTicketId(parseTicketCode(ticketCode));
        maxTicketId = maxTicketId > ticketId ? maxTicketId : ticketId;
    }

    return maxTicketId;
}