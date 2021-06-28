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
  ) {
  }

  readonly DISPLAYED_COLUMNS = ['id', 'date', 'title', 'client', 'state'];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{ticks: {beginAtZero: true}}]
    }
  };
  public barChartLabels = [];
  public barChartData = [{data: [], label: '', backgroundColor: '', hoverBackgroundColor: ''}];

  public pieChartLabels = ["Open", "In Progress", "Resolved"];
  public pieChartData = [{
    data: [], label: '', backgroundColor: [
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(0, 200, 83, 0.8)'],
    hoverBackgroundColor: [
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(0, 200, 83, 1)']
  }];


  ngOnInit(): void {
    const projectName = this.route.snapshot.paramMap.get("name");
    this.projectService.getProjectDetail(projectName).pipe(first()).subscribe(res => {
      this.project = res;
      this.dataSource = new MatTableDataSource<TicketModel>(this.project.tickets);

      this.project.ticketStats = new TicketStats(this.project.ticketStats);
      this.updateCharts();
    });
  }

  private updateCharts() {
    this.monthStatsKeys = Object.keys(this.project.monthStats)
      .map(timestamp => new Date(Number(timestamp)));
    this.monthStatsValues = Object.values(this.project.monthStats);

    this.pieChartData[0].data = [];
    this.pieChartData[0].data = [
      this.project.ticketStats.open,
      this.project.ticketStats.inProgress,
      this.project.ticketStats.resolved
    ];
    this.barChartLabels = this.monthStatsKeys.map(date => date.toLocaleString('default', {
      month: 'long',
      year: "numeric"
    }));
    this.barChartData = [{
      data: Array.from(this.monthStatsValues),
      label: 'Tickets Issued Per Month',
      backgroundColor: '#42A5F5',
      hoverBackgroundColor: '#1E88E5'
    }];
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
        this.updateCharts();
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
        this.updateCharts();
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
