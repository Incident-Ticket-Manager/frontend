export class Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  ticketCount: number;

  constructor(data?: any) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.address = data.address;
  }


}
