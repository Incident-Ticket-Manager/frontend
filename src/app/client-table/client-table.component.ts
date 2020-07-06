import {Component, OnInit} from '@angular/core';
import {ClientService} from "../services/client.service";
import {Profile} from "../model/Profile";
import {Client} from "../model/Client";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateClientComponent} from "../create-client/create-client.component";

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css']
})
export class ClientTableComponent implements OnInit {
  displayedColumns: string[] = ["name", "email", "phone", "address", "actions"];

  public clients: Client[];
  public profile: Profile = JSON.parse(sessionStorage.getItem("profile"));


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
  }

}
