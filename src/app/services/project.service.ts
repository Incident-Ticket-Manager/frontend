import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Project} from "../model/Project";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private api = "https://api-itm.herokuapp.com";

  constructor(
    private http: HttpClient
  ) {
  }

  async getProjects() {
    return this.http.get<Project[]>(`${this.api}/projects`).toPromise();
  }
}
