import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UsersService} from '../services/user.service';
import {ProjectService} from '../services/project.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-delete-user-project-modal',
  templateUrl: './delete-user-project-modal.component.html',
  styleUrls: ['./delete-user-project-modal.component.css']
})
export class DeleteUserProjectModalComponent implements OnInit {
  deleteUserForm = new FormGroup({
    user: new FormControl('', Validators.required)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteUserProjectModalComponent>,
    private projectService: ProjectService
  ) { }

  ngOnInit() {}

  onCancelClick() {
    this.dialogRef.close();
  }

  async onSubmit() {
    if (this.deleteUserForm.invalid) {
      return;
    }

    await this.projectService.deleteUserFromProject(this.data.project.name, this.deleteUserForm.get('user').value);
    this.onCancelClick();
  }
}
