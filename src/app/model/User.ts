export class User {
  name: string;
  password: string;
  email: string;
  admin: boolean; 

  constructor(data?: any) {
    this.name = data.username;
    this.password = data.password;
    this.email = data.email;
    this.admin = data.admin; 
  }
}