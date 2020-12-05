import part1 from "./part1"
import part2 from "./part2"

const MAX_ROWS: number = 128;
const MAX_COLUMNS: number = 8;

interface Ticket {
    row: number,
    column: number
}

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

const ticketCodeRegex = /(\w{7})(\w{3})/;
export function parseTicketCode(ticketCodeString): Ticket {
    const [_, rowCode, columnCode] = ticketCodeString.match(ticketCodeRegex);
    return {
        row: binaryExtract(rowCode, 0, MAX_ROWS-1, "F"),
        column: binaryExtract(columnCode, 0, MAX_COLUMNS-1, "L")
    }
}

export function calculateTicketId(ticket: Ticket): number {
    return (ticket.row * 8) + ticket.column;
}

export default {
    part1,
    part2
}