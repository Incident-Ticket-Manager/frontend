import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../../model/Profile";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = "https://api-itm.herokuapp.com";

  constructor(
    private http: HttpClient
  ) {

  }

  async login(username: string, password: string) {
      const profile = await this.http.post<Profile>(`${this.api}/login`, {username, password}).toPromise();
      sessionStorage.setItem("profile", JSON.stringify(profile));
  }

  async register(username: string, email: string, password: string) {
      await this.http.post(`${this.api}/register`, {username, email, password}).toPromise();
  }
}
