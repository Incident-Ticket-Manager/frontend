export class User {
  username: string;
  password: string;
  email: string;
  role: string;

  constructor(data?: any) {
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.role = data.role;
  }
}
