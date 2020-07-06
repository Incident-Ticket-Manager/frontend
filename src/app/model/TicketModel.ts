import {Client} from './Client';

export class TicketModel {
  id: string;
  title: string;
  content: string;
  status: string;
  date: Date;
  clientId: string;
  projectName: string;
  project: string;
  userName: string;
  client: Client;

  constructor(data?: any) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.status = data.status;
    this.date = data.date;
    this.clientId = data.clientId;
    this.projectName = data.projectName;
    this.project = data.project;
    this.userName = data.userName;
    this.client = data.client;
  }
}
