import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../model/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private api = 'https://api-itm.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  getClients$() {
    return this.http.get<Client[]>(`${this.api}/clients`);
  }
}
