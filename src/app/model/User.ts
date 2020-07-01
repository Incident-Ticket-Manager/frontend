export class User {
  name: string;
  phone: string;
  address: string;
  email: string;

  constructor(data?: any) {
    this.name = data.name;
    this.phone = data.phone;
    this.address = data.address;
    this.email = data.date;
  }
}