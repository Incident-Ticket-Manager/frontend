import {Component, OnInit} from '@angular/core';
import {Project} from "../model/Project";
import {ProjectService} from "../services/project.service";

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'admin', 'date','actions'];

  public projects: Project[];


  constructor(
    private service: ProjectService
  ) {
  }

  async ngOnInit() {
    this.projects = await this.service.getProjects();
  }
}
