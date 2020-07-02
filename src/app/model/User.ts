export class User {
  name: string;
  password: string;
  email: string;
  role: string; 

  constructor(data?: any) {
    this.name = data.name;
    this.password = data.password;
    this.email = data.date;
    this.role = data.role; 
  }
}