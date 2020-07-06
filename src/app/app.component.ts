import {Component} from '@angular/core';
import {Profile} from "./model/Profile";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Incident Ticket Manager';
  profile: Profile = JSON.parse(sessionStorage.getItem("profile"));

  constructor(private router: Router) {
  }

  logout() {
    sessionStorage.setItem("profile", null);
    this.router.navigate(["login"]);
  }
}
