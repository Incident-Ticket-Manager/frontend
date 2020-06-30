export class TicketStats {
  open: number;
  resolved: number;
  total: number;
  inProgress: number;

  constructor(data?: any) {
    this.open = data.open;
    this.resolved = data.resolved;
    this.total = data.total;
    this.inProgress = data['in progress'];
  }
}
