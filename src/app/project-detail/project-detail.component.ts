import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../services/project.service';
import {Project} from '../model/Project';
import {first} from 'rxjs/operators';
import {TicketStats} from '../model/ticket-stats';
import {MatDialog} from '@angular/material/dialog';
import {TicketDetailComponent} from '../ticket-detail/ticket-detail.component';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';
import {ActivatedRoute, Router} from '@angular/router';
import {FormTicketComponent} from '../form-ticket/form-ticket.component';
import {MatTableDataSource} from '@angular/material/table';
import {TicketModel} from '../model/TicketModel';
import {MatPaginator} from '@angular/material/paginator';
import {AddUserProjectModalComponent} from '../add-user-project-modal/add-user-project-modal.component';
import {DeleteUserProjectModalComponent} from '../delete-user-project-modal/delete-user-project-modal.component';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  dataSource: MatTableDataSource<TicketModel>;
  @ViewChild('paginator') set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  monthStatsKeys: Date[];
  monthStatsValues: number[];

  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  readonly DISPLAYED_COLUMNS = ['id', 'date', 'title', 'client', 'state'];

  ngOnInit(): void {
    const projectName = this.route.snapshot.paramMap.get("name");
    this.projectService.getProjectDetail(projectName).pipe(first()).subscribe(res => {
      this.project = res;
      this.dataSource = new MatTableDataSource<TicketModel>(this.project.tickets);
      this.project.ticketStats = new TicketStats(this.project.ticketStats);
      this.monthStatsKeys = Object.keys(this.project.monthStats).map(timestamp => new Date(Number(timestamp)));
      this.monthStatsValues = Object.values(this.project.monthStats);
    });
  }

  openTicketDetail(ticket) {
    const modal = this.dialog.open(TicketDetailComponent, {
      width: '500px',
      data: ticket
    });

    modal.afterClosed().pipe(first()).subscribe(() => {
      this.projectService.getProjectDetail(this.project.name).pipe(first()).subscribe(res => {
        this.project = res;
        this.project.ticketStats = new TicketStats(this.project.ticketStats);
        this.dataSource.data = this.project.tickets;
      });
    });
  }

  onDeleteClick() {
    this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      data: {
        itemModel: 'project',
        name: this.project.name,
        project: this.project
      }
    });
  }

  onAddTicketClick() {
    const modal = this.dialog.open(FormTicketComponent, {
      width: '500px',
      height: '400px',
      data: {
        project: this.project.name
      },
      panelClass: ['ticket-modal']
    });

    modal.afterClosed().pipe(first()).subscribe(() => {
      this.projectService.getProjectDetail(this.project.name).pipe(first()).subscribe(res => {
        this.project = res;
        this.project.ticketStats = new TicketStats(this.project.ticketStats);
        this.dataSource.data = this.project.tickets;
      });
    });
  }

  goBack() {
    this.router.navigateByUrl('');
  }

  showAddUserModal() {
    const modal = this.dialog.open(AddUserProjectModalComponent, {
      width: '500px',
      height: '220px',
      data: {
        project: this.project.name
      }
    });

    modal.afterClosed().pipe(first()).subscribe(() => {
      this.projectService.getProjectDetail(this.project.name).pipe(first()).subscribe(res => {
        this.project = res;
        this.project.ticketStats = new TicketStats(this.project.ticketStats);
        this.dataSource.data = this.project.tickets;
      });
    });
  }

  showDeleteUserModal() {
    const modal = this.dialog.open(DeleteUserProjectModalComponent, {
      width: '500px',
      height: '220px',
      data: {
        project: this.project
      }
    });

    modal.afterClosed().pipe(first()).subscribe(() => {
      this.projectService.getProjectDetail(this.project.name).pipe(first()).subscribe(res => {
        this.project = res;
        this.project.ticketStats = new TicketStats(this.project.ticketStats);
        this.dataSource.data = this.project.tickets;
      });
    });
  }

}
