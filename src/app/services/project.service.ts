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

  async createProject(project: Project) {
    return this.http.post<Project>(`${this.api}/projects`, project).toPromise();
  }

  async updateProjectName(project: Project, newName: string) {
    return this.http.post<Project>(`${this.api}/projects`, {name: project.name, newName}).toPromise();
  }

  async deleteProject(project: Project) {
    const name = project.name.replace(/\s/g, '%20');
    return this.http.delete(`${this.api}/projects/${name}`).toPromise();
  }

  getProjectDetail(name: string) {
    name.replace(/\s/g, '%20');
    return this.http.get<Project>(`${this.api}/projects/${name}`);
  }
}
