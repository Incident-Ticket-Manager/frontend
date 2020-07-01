import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {Project} from "../model/Project";

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.css']
})
export class DeleteProjectComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DeleteProjectComponent>) { }

  ngOnInit(): void {
  }

  public accept() {
    this.dialogRef.close(true);
  }

  public decline() {
    this.dialogRef.close(false);
  }
}
