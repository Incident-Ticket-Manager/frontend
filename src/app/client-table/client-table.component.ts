import {Component, OnInit} from '@angular/core';
import {ClientService} from "../services/client.service";
import {Profile} from "../model/Profile";
import {Client} from "../model/Client";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateClientComponent} from "../create-client/create-client.component";
import {DeleteProjectComponent} from "../delete-project/delete-project.component";
import {UpdateClientComponent} from "../update-client/update-client.component";

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css']
})
export class ClientTableComponent implements OnInit {
  displayedColumns: string[] = ["name", "email", "phone", "address", "actions"];

  public clients: Client[];
  public profile: Profile = JSON.parse(sessionStorage.getItem("profile"));

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{ticks: {beginAtZero: true}}]
    }
  };
  public barChartLabels = [];
  public barChartData = [{data: [], label: '', backgroundColor: '', hoverBackgroundColor: ''}];

  constructor(
    private service: ClientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  async handleClickCreate() {
    const dialogRef = this.dialog.open(CreateClientComponent, {
      width: "300px"
    });

    let result = await dialogRef.afterClosed().toPromise();
    try {
      if (result) {
        result = await this.service.createClient(result);
        this.clients = [...this.clients, result];
        this.snackBar.open("Success : client created");
      }
    } catch (e) {
      this.snackBar.open(e.message);
      console.error(e.message);
    }
  }

  async ngOnInit() {
    await this.refreshClients();
  }

  async refreshClients() {
    this.clients = await this.service.getClients();

    this.barChartLabels = Array.from(this.clients.map(c => c.name));
    this.barChartData = [{
      data: Array.from(this.clients.map(c => c.ticketCount)),
      label: 'Tickets Issued',
      backgroundColor: '#42A5F5',
      hoverBackgroundColor: '#1E88E5'
    }];
  }

  async handleClickUpdateClient(client: Client) {
    const dialogRef = this.dialog.open(UpdateClientComponent, {
      width: "300px",
      data: client
    });

    let result = await dialogRef.afterClosed().toPromise();

    try {
      if (result) {
        result = await this.service.updateClient(result);
        await this.refreshClients();
        this.snackBar.open("Success : client modified");
      }
    } catch (e) {
      this.snackBar.open(e.message);
      console.error(e.message);
    }
  }

  async handleClickDeleteClient(client: Client) {
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      width: "300px",
    });

    let result = await dialogRef.afterClosed().toPromise();
    try {
      if (result) {
        result = await this.service.deleteClient(client.id);
        await this.refreshClients();
        this.snackBar.open("Success : client deleted");
      }
    } catch (e) {
      this.snackBar.open(e.message);
      console.error(e.message);
    }
  }

}
