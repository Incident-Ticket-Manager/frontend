import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';
import {Project} from '../../model/Project';
import {first} from 'rxjs/operators';
import {TicketStats} from '../../model/ticket-stats';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  private project: Project;

  constructor(
    private projectService: ProjectService
  ) { }

  readonly DISPLAYED_COLUMNS = ['id', 'date', 'title', 'client', 'state'];

  ngOnInit(): void {
    this.projectService.getProjectDetail('Super projet').pipe(first()).subscribe(res => {
      this.project = res;
      this.project.ticketStats = new TicketStats(this.project.ticketStats);
    });
  }

}
