export class TicketStats {
  open: number;
  close: number;
  total: number;

  constructor(data?: any) {
    this.open = data.Open;
    this.close = data.close;
    this.total = data.total;
  }
}
