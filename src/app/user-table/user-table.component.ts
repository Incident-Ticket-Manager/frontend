import { Component, OnInit } from '@angular/core';
import {User} from "../model/User";
import {UsersService} from "../services/users.service";
import {MatDialog} from "@angular/material/dialog";
import {NewUserComponent} from "../new-user/new-user.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Profile} from "../model/Profile";
import {ModifUserComponent} from "../modif-user/modif-user.component";
import {DeleteUserComponent} from "../delete-user/delete-user.component";


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'role', 'mail', 'actions'];
  public users: User[];
  public profile: Profile = JSON.parse(sessionStorage.getItem("profile"));


  constructor(
    private service: UsersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  async ngOnInit() {
    await this.refreshUsers();
  }

  private async refreshUsers() {
    this.users = await this.service.getUsers();
  }

  async handleClickCreateUser() {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: "300px",
    });

    let result = await dialogRef.afterClosed().toPromise();
    try {
      if (result) {
        console.log(result); 
        result = await this.service.createUser(result.username, result.email, result.password);
        this.users = [...this.users, result];
        this.snackBar.open("Success : user added");
      }
    } catch (e) {
      this.snackBar.open(e.message);
      console.error(e.message);
    }
  }


  async handleClickModifUser(user: User) {
    const dialogRef = this.dialog.open(ModifUserComponent, {
      width: "300px",
      data: {name: user.name, mail: user.email, password: user.password}
    });

    let result = await dialogRef.afterClosed().toPromise();
    console.log(result)
    try {
      if (result) {
        result = await this.service.updateUser(user, result.name, result.email, result.password);
        this.users = await this.service.getUsers();
        this.snackBar.open("Success : user modified");
      }
    } catch (e) {
      this.snackBar.open(e.message);
      console.error(e.message);
    }
  }

  async handleClickDeleteUser(user: User) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: "300px",
    });

    let result = await dialogRef.afterClosed().toPromise();
    try {
      if (result) {
        result = await this.service.deleteUser(user);
        this.users = await this.service.getUsers();
        this.snackBar.open("Success : user deleted");
      }
    } catch (e) {
      this.snackBar.open(e.message);
      console.error(e.message);
    }
  }

}
