import ticketModel from "../../config/models/ticket.model.js";

class TicketManager {
    async createTicket(ticket) {
      const response = await ticketModel.create(ticket);
      return response;
    }
  }
  
  export const ticketManager = new TicketManager();