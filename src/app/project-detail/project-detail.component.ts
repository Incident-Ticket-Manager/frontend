import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../services/project.service';
import {Project} from '../model/Project';
import {first} from 'rxjs/operators';
import {TicketStats} from '../model/ticket-stats';
import {MatDialog} from '@angular/material/dialog';
import {TicketDetailComponent} from '../ticket-detail/ticket-detail.component';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  readonly DISPLAYED_COLUMNS = ['id', 'date', 'title', 'client', 'state'];

  ngOnInit(): void {
    const projectName = this.route.snapshot.paramMap.get("name");
    this.projectService.getProjectDetail(projectName).pipe(first()).subscribe(res => {
      this.project = res;
      this.project.ticketStats = new TicketStats(this.project.ticketStats);
    });
  }

  openTicketDetail(ticket) {
    this.dialog.open(TicketDetailComponent, {
      width: '500px',
      data: ticket
    });
  }

  onDeleteClick() {
    this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      data: this.project
    });
  }

}
