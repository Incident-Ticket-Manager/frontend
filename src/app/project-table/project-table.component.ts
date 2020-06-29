import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Project} from "../model/Project";
import {ProjectService} from "../services/project.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css']
})
export class ProjectTableComponent implements OnInit {
  public projects: Project[];
  readonly DISPLAYED_COLUMNS: ["name", "admin", "actions"];

  constructor(
    private service: ProjectService
  ) {
  }

  async ngOnInit() {
    this.projects = await this.service.getProjects();
  }
}
