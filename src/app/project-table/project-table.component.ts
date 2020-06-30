import {Component, OnInit} from '@angular/core';
import {Project} from "../model/Project";
import {ProjectService} from "../services/project.service";
import {MatDialog} from "@angular/material/dialog";
import {NewProjectComponent} from "../new-project/new-project.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Profile} from "../model/Profile";

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
}
