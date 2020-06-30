export class TicketModel {
  id: string;
  title: string;
  content: string;
  status: string;
  date: Date;
  clientId: number;
  projectName: string;
  userName: string;
  // @TODO client model
  client: any;

  constructor(data?: any) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.status = data.status;
    this.date = data.date;
    this.clientId = data.clientId;
    this.projectName = data.projectName;
    this.userName = data.userName;
    this.client = data.client;
  }
}
