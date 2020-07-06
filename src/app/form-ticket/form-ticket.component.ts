import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TicketModel} from '../model/TicketModel';
import {FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../services/client.service';
import {Observable} from 'rxjs';
import {Client} from '../model/Client';
import {TicketService} from '../services/ticket.service';
import {first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-ticket',
  templateUrl: './form-ticket.component.html',
  styleUrls: ['./form-ticket.component.css']
})
export class FormTicketComponent implements OnInit {

  clients$: Observable<Client[]>;
  ticketForm = new FormGroup({
    title: new FormControl(!!this.data.ticket ? this.data.ticket.title : '', Validators.required),
    detail: new FormControl(this.data.ticket ? this.data.ticket.content : '', Validators.required),
    client: new FormControl(!!this.data.ticket ? this.data.ticket.client.id : '', Validators.required)
  });

  constructor(
    private dialogRef: MatDialogRef<FormTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService,
    private ticketService: TicketService,
    private snackService: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.clients$ = this.clientService.getClients$();
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.ticketForm.invalid) {
      return;
    }

    if (!!this.data.ticket) {
      const updatedTicket = new TicketModel({
        title: this.ticketForm.get('title').value,
        content: this.ticketForm.get('detail').value,
        client: this.ticketForm.get('client').value,
      });

      this.ticketService.updateTicket(this.data.ticket.id, updatedTicket)
        .pipe(first())
        .subscribe(
          res => this.dialogRef.close(new TicketModel(res)),
          () => {
            this.snackService.open('Error while updating ticket', null, {duration: 3000});
            this.dialogRef.close();
          }
        );
      return;
    }

    const newTicket = new TicketModel({
      title: this.ticketForm.get('title').value,
      content: this.ticketForm.get('detail').value,
      client: this.ticketForm.get('client').value,
      project: this.data.project ? this.data.project : this.data.ticket.projectName
    });

    this.ticketService.addTicket(newTicket)
      .pipe(first())
      .subscribe(
        () => this.snackService.open('Ticket successfully created', null, { duration: 3000 }),
        () => this.snackService.open('Error while creating ticket', null, { duration: 3000 }),
        () => this.dialogRef.close()
      );
  }

}
