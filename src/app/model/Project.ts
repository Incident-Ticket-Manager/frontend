import {TicketStats} from './ticket-stats';
import {TicketModel} from './TicketModel';
import {User} from './User';

export class Project {
  name: string;
  admin: string;
  tickets: TicketModel[];
  ticketStats: TicketStats;
  monthStats: any;
  isAdmin: boolean;
  date: Date;
  users: User[];

  constructor(data?: any) {
    this.name = data.name;
    this.admin = data.admin;
    this.tickets = !!data.tickets ? data.tickets : null;
    this.ticketStats = !!data.ticketStats ? data.ticketStats : null;
    this.isAdmin = !!data.isAdmin ? data.isAdmin : null;
    this.date = data.date;
    this.monthStats = data.monthStats;
    this.users = data.users;
  }
}
