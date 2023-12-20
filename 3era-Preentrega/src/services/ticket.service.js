import { TicketManager } from "../DAL/dao/ticket.dao.js";

const ticketManager = new TicketManager
class TicketService{
    async createTicket(purchase_datetime, amount, purchaser){
        try {
            return await ticketManager.createTicket(purchase_datetime, amount, purchaser)
        } catch (error) {
            console.log(error);
        }
    }
}

export default TicketService