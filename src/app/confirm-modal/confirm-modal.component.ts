import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Project} from '../model/Project';
import {ProjectService} from '../services/project.service';
import {first} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project,
    private projectService: ProjectService,
    private snackService: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  onDeleteClick() {
    this.projectService.deleteProject(this.data)
      .then(() => this.showSuccessSnackBar())
      .catch(() => this.showErrorSnackBar())
      .finally(() => {
        this.dialogRef.close();
        this.router.navigateByUrl('');
      });
  }

  showSuccessSnackBar() {
    this.snackService.open('Projet supprimé !', '', {
      duration: 2000
    });
  }

  showErrorSnackBar() {
    this.snackService.open('Erreur dans la suppression du projet', '', {
      duration: 2000
    });
  }

}
