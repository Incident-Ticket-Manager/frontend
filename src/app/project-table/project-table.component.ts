import {Component, OnInit} from '@angular/core';
import {Project} from "../model/Project";
import {ProjectService} from "../services/project.service";
import {MatDialog} from "@angular/material/dialog";
import {NewProjectComponent} from "../new-project/new-project.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Profile} from "../model/Profile";
import {ModifProjectComponent} from "../modif-project/modif-project.component";
import {DeleteProjectComponent} from "../delete-project/delete-project.component";



@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'admin', 'date', 'actions'];
  public projects: Project[];
  public profile: Profile = JSON.parse(sessionStorage.getItem("profile"));


  constructor(
    private service: ProjectService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  async ngOnInit() {
    await this.refreshProjects();
  }

  private async refreshProjects() {
    this.projects = await this.service.getProjects();
  }

  async handleClickCreateProject() {
    const dialogRef = this.dialog.open(NewProjectComponent, {
      width: "300px",
    });

    let result = await dialogRef.afterClosed().toPromise();
    try {
      if (result) {
        result = await this.service.createProject(result);
        this.projects = [...this.projects, result];
        this.snackBar.open("Success : project created");
      }
    } catch (e) {
      this.snackBar.open(e.message);
      console.error(e.message);
    }
  }


  async handleClickModifProject(project: Project) {
    const dialogRef = this.dialog.open(ModifProjectComponent, {
      width: "300px",
      data: {name: project.name}
    });

    let result = await dialogRef.afterClosed().toPromise();

    try {
      if (result) {
        result = await this.service.updateProjectName(project, result.name);
        this.projects = await this.service.getProjects();
        this.snackBar.open("Success : project modified");
      }
    } catch (e) {
      this.snackBar.open(e.message);
      console.error(e.message);
    }
  }

  async handleClickDeleteProject(project: Project) {
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      width: "300px",
    });

    let result = await dialogRef.afterClosed().toPromise();
    try {
      if (result) {
        result = await this.service.deleteProject(project);
        this.projects = await this.service.getProjects();
        this.snackBar.open("Success : project deleted");
      }
    } catch (e) {
      this.snackBar.open(e.message);
      console.error(e.message);
    }
  }
}
