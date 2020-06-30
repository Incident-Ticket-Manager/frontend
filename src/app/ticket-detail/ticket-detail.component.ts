import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TicketModel} from '../model/TicketModel';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TicketDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TicketModel
  ) { }

  ngOnInit(): void {}

  onCancelClick() {
    this.dialogRef.close();
  }

  onUpdateClick() {
    // @TODO implement add form with injected ticket
  }
}
