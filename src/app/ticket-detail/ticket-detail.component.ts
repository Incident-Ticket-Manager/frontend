import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TicketModel} from '../model/TicketModel';
import {TicketService} from '../services/ticket.service';
import {first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormTicketComponent} from '../form-ticket/form-ticket.component';
import {TicketStats} from '../model/ticket-stats';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<TicketDetailComponent>,
    private ticketService: TicketService,
    private snackService: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: TicketModel
  ) { }

  ngOnInit(): void {}

  onCancelClick() {
    this.dialogRef.close();
  }

  onUpdateClick() {
    const modal = this.dialog.open(FormTicketComponent, {
      width: '500px',
      height: '400px',
      data: {
        ticket: this.data
      },
      panelClass: ['ticket-modal']
    });

    modal.afterClosed().pipe(first()).subscribe(
      res => {
        this.data = new TicketModel(res);
        },
      () => this.snackService.open('Error while assigning ticket', null, { duration: 3000})
    );
  }

  onAssignClick() {
    this.ticketService.assignTicket(this.data.id)
      .pipe(first())
      .subscribe(
        res => {
            this.snackService.open('Ticket have successfully been updated', null, {duration: 3000});
            this.data = new TicketModel(res);
            });
  }

  onResolveClick() {
    this.ticketService.resolveTicket(this.data.id)
      .pipe(first())
      .subscribe(
        res => {
          this.snackService.open('Ticket have successfully been resolved', null, {duration: 3000});
          this.data = new TicketModel(res);
          },
        () => this.snackService.open('Error while resolving ticket', null, { duration: 3000})
      );
  }

  canResolve() {
    return !!this.data.userName
      && this.data.status !== 'Resolved'
      && this.data.userName === JSON.parse(sessionStorage.getItem('profile')).username;
  }

  canUpdate() {
    return this.data.status !== 'Resolved';
  }
}
