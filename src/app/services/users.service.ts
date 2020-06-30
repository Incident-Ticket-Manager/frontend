import { Injectable } from '@angular/core';
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

  async getUserd() {
    return this.http.get<User[]>(`${this.api}/users`).toPromise();
  }

  async createUser(project: User) {
    return this.http.post<User>(`${this.api}/users`, project).toPromise();
  }

  async updateUser(project: User, newName: string) {
    return this.http.put<User>(`${this.api}/users`, {name: project.name, newName}).toPromise();
  }

  async deleteUser(project: User) {
    const name = project.name.replace(/\s/g, '%20');
    return this.http.delete(`${this.api}/users/${name}`).toPromise();
  }
}

