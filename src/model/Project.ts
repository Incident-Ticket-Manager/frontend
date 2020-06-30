import {TicketStats} from './ticket-stats';
import {TicketModel} from './TicketModel';

export class Project {
  name: string;
  admin: string;
  tickets: TicketModel[];
  ticketStats: TicketStats;
  isAdmin: boolean;
  date: Date;

  constructor(data?: any) {
    this.name = data.name;
    this.admin = data.admin;
    this.tickets = data.tickets;
    this.ticketStats = data.ticketStats;
    this.isAdmin = data.isAdmin;
    this.date = data.date;
  }
}
