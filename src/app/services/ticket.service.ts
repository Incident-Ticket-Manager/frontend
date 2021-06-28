import { Injectable } from '@angular/core';
import {TicketModel} from '../model/TicketModel';
import {HttpClient} from '@angular/common/http';
import {tick} from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private api = "https://api-itm.herokuapp.com";

  constructor(
    private http: HttpClient
  ) {
  }

  addTicket(ticket: TicketModel) {
    return this.http.post(`${this.api}/tickets`, ticket);
  }

  assignTicket(ticketId) {
    const username = JSON.parse(sessionStorage.getItem('profile')).username;
    const body = {
      ticket: ticketId,
      user: username
    };
    return this.http.post(`${this.api}/tickets/assign`, body);
  }

  resolveTicket(ticketId) {
    return this.http.post(`${this.api}/tickets/${ticketId}/resolve`, null);
  }

  updateTicket(ticketId, newTicket) {
    return this.http.put(`${this.api}/tickets/${ticketId}`, newTicket);
  }

  deleteTicket(ticketId) {
    return this.http.delete(`${this.api}/tickets/${ticketId}`);
  }
}
