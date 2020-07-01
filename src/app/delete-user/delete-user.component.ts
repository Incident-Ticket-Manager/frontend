import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>) { }

  ngOnInit(): void {
  }

  public accept() {
    this.dialogRef.close(true);
  }

  public decline() {
    this.dialogRef.close(false);
  }
}
