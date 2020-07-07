import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../model/User';
import {UsersService} from '../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../services/project.service';

@Component({
  selector: 'app-add-user-project-modal',
  templateUrl: './add-user-project-modal.component.html',
  styleUrls: ['./add-user-project-modal.component.css']
})
export class AddUserProjectModalComponent implements OnInit {
  users: User[];

  addUserForm = new FormGroup({
    user: new FormControl('', Validators.required)
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService,
    private dialogRef: MatDialogRef<AddUserProjectModalComponent>,
    private projectService: ProjectService
  ) { }

  async ngOnInit() {
    this.users = await this.userService.getUsers();
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  async onSubmit() {
    if (this.addUserForm.invalid) {
      return;
    }

    const body = {
      user: this.addUserForm.get('user').value,
      project: this.data.project
    };

    await this.projectService.addUserToProject(body);
    this.onCancelClick();
  }

}
