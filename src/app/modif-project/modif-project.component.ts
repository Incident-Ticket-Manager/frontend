import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
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

  registerForm = new FormGroup({
    projectname: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  constructor(public dialogRef: MatDialogRef<ModifProjectComponent>) {
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
