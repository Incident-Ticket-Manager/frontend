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

  getProjects() {
    return this.http.get<Project[]>(`${this.api}/projects`).toPromise();
  }

  createProject(project: Project) {
    return this.http.post<Project>(`${this.api}/projects`, {name: project.name}).toPromise();
  }

  updateProjectName(project: Project, newName: string) {
    return this.http.put<Project>(`${this.api}/projects/${project.name}`, {name: newName}).toPromise();
  }

  deleteProject(project: Project) {
    const name = project.name.replace(/\s/g, '%20');
    return this.http.delete(`${this.api}/projects/${name}`).toPromise();
  }

  getProjectDetail(name: string) {
    name.replace(/\s/g, '%20');
    return this.http.get<Project>(`${this.api}/projects/${name}`);
  }

  addUserToProject(body: any) {
    return this.http.post(`${this.api}/projects/users`, body).toPromise();
  }

  deleteUserFromProject(projectName, userName) {
    projectName.replace(/\s/g, '%20');
    userName.replace(/\s/g, '%20');
    return this.http.delete(`${this.api}/projects/${projectName}/users/${userName}`).toPromise();
  }
}
