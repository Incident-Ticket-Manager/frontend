import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/User";


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private api = "https://api-itm.herokuapp.com";

  constructor(
    private http: HttpClient
  ) {
  }

  async getUsers() {
    return this.http.get<User[]>(`${this.api}/users`).toPromise();
  }

  async createUser(username: string, email: string, password: string) {
    await this.http.post(`${this.api}/register`, {username, email, password}).toPromise();
  }

  async updateUser(user: User, newName: string, newEmail: string, newPassword: string) {
    return this.http.put<User>(`${this.api}/users/${user.name}`, {name: newName, email: newEmail, password: newPassword}).toPromise();
  }

  async deleteUser(user: User) {
    console.log(user.username)
    const name = user.username.replace(/\s/g, '%20');
    return this.http.delete(`${this.api}/users/${name}`).toPromise();
  }
}

