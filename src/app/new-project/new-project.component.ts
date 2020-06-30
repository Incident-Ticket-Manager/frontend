import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Project} from "../model/Project";

export interface DialogData {
  projectname: string;
}

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.css']
})
export class NewProjectComponent implements OnInit {

  registerForm = new FormGroup({
    projectname: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(public dialogRef: MatDialogRef<NewProjectComponent>) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const username = JSON.parse(sessionStorage.getItem("profile")).username;
    this.dialogRef.close(new Project(this.projectname.value, username, new Date().toISOString()));
  }

  get projectname() {
    return this.registerForm.get('projectname');
  }

}
