import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../model/Project';
import {ProjectService} from '../services/project.service';
import {first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {TicketService} from '../services/ticket.service';
import {toTitleCase} from 'codelyzer/util/utils';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private ticketService: TicketService,
    private snackService: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onDeleteClick() {
    if (!!this.data.project) {
      this.projectService.deleteProject(this.data.project)
        .then(() => this.showSuccessSnackBar())
        .catch(() => this.showErrorSnackBar())
        .finally(() => {
          this.dialogRef.close();
          this.router.navigateByUrl('');
        });
      return;
    }

    this.ticketService.deleteTicket(this.data.ticket.id)
      .pipe(first())
      .subscribe(
        () => this.showSuccessSnackBar(),
        () => this.showErrorSnackBar(),
        () => this.dialogRef.close());
  }

  showSuccessSnackBar() {
    this.snackService.open(`${this.data.itemModel} supprimé !`, '', {
      duration: 2000
    });
  }

  showErrorSnackBar() {
    this.snackService.open(`Erreur dans la suppression du ${this.data.itemModel}`, '', {
      duration: 2000
    });
  }

}
