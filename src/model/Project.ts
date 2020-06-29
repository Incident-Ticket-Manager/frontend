import {TicketStats} from './ticket-stats';

export class Project {
  name: string;
  admin: string;
  // @TODO set Ticket model
  tickets: any[];
  ticketStats: TicketStats;

  constructor(data?: any) {
    this.name = data.name;
    this.admin = this.admin;
  }
}
