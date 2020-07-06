import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Client} from "../model/Client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private api = "https://api-itm.herokuapp.com";

  constructor(
    private http: HttpClient
  ) {
  }

  getClients(): Promise<Client[]> {
    return this.http.get<Client[]>(`${this.api}/clients`).toPromise();
  }

  createClient(client: Client): Promise<Client> {
    return this.http.post<Client>(`${this.api}/clients`, client).toPromise();
  }

  updateClient(client: Client): Promise<Client> {
    return this.http.put<Client>(`${this.api}/clients/${client.id}`, {
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address
    }).toPromise();
  }

  deleteClient(clientId: string): Promise<any> {
    return this.http.delete(`${this.api}/clients/${clientId}`).toPromise();
  }
}
