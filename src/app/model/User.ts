export class User {
  name: string;
  password: string;
  email: string;
  role: string; 

  constructor(data?: any) {
    this.name = data.username;
    this.password = data.password;
    this.email = data.email;
    this.role = data.role; 
  }
}