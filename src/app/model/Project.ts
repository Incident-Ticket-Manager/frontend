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
    this.tickets = !!data.tickets ? data.tickets : null;
    this.ticketStats = !!data.ticketStats ? data.ticketStats : null;
    this.isAdmin = !!data.isAdmin ? data.isAdmin : null;
    this.date = data.date;
  }
}
