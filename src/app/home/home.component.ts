import { Component, OnInit } from '@angular/core';
import {Profile} from "../model/Profile";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  profile: Profile = JSON.parse(sessionStorage.getItem("profile"));

  ngOnInit(): void {
  }

}
