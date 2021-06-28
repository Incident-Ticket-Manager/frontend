import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Project} from "../model/Project";

export interface DialogData {
  projectname: string;
}

@Component({
  selector: 'app-modif-project',
  templateUrl: './modif-project.component.html',
  styleUrls: ['./modif-project.component.css']
})
export class ModifProjectComponent implements OnInit {

  registerForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ModifProjectComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.registerForm = new FormGroup({
      projectname: new FormControl(data.name, [Validators.required, Validators.minLength(4)]),
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const username = JSON.parse(sessionStorage.getItem("profile")).username;
    this.dialogRef.close(new Project({name: this.projectname.value, admin: username, date: new Date().toISOString()}));
  }

  get projectname() {
    return this.registerForm.get('projectname');
  }

}
