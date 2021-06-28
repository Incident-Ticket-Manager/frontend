import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProjectTableComponent} from './project-table/project-table.component';
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {TokenInterceptor} from "./security/token.interceptor";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {NewProjectComponent} from "./new-project/new-project.component";
import {HomeComponent} from './home/home.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {StatusPipe} from './pipes/status.pipe';
import {TicketDetailComponent} from './ticket-detail/ticket-detail.component';
import {ConfirmModalComponent} from './confirm-modal/confirm-modal.component';
import {ModifProjectComponent} from './modif-project/modif-project.component';
import {DeleteProjectComponent} from './delete-project/delete-project.component';
import {FormTicketComponent} from './form-ticket/form-ticket.component';
import {MatSelectModule} from '@angular/material/select';
import {TimestampToDateComponent} from './timestamp-to-date/timestamp-to-date.component';
import {MonthPipe} from './pipes/month.pipe';
import {ClientTableComponent} from './client-table/client-table.component';
import {CreateClientComponent} from './create-client/create-client.component';
import {UpdateClientComponent} from './update-client/update-client.component';
import {ChartsModule} from 'ng2-charts';
import {AddUserProjectModalComponent} from './add-user-project-modal/add-user-project-modal.component';
import {DeleteUserProjectModalComponent} from './delete-user-project-modal/delete-user-project-modal.component';
import {ModifUserComponent} from './modif-user/modif-user.component';
import {DeleteUserComponent} from './delete-user/delete-user.component';
import {NewUserComponent} from './new-user/new-user.component';
import {UserTableComponent} from './user-table/user-table.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProjectTableComponent,
    NewProjectComponent,
    ProjectDetailComponent,
    StatusPipe,
    TicketDetailComponent,
    ConfirmModalComponent,
    ModifProjectComponent,
    DeleteProjectComponent,
    FormTicketComponent,
    TimestampToDateComponent,
    MonthPipe,
    ClientTableComponent,
    CreateClientComponent,
    UpdateClientComponent,
    AddUserProjectModalComponent,
    DeleteUserProjectModalComponent,
    ModifUserComponent,
    DeleteUserComponent,
    NewUserComponent,
    UserTableComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule,
    ChartsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
