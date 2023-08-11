import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { HomePageComponent } from './MyComponents/home-page/home-page.component';
import { SyncPageComponent } from './MyComponents/sync-page/sync-page.component'
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SyncDataComponent } from './MyComponents/sync-data/sync-data.component';
import { NewSyncPageComponent } from './MyComponents/new-sync-page/new-sync-page.component';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { HeaderComponent } from './MyComponents/header/header.component';
import { SidenavComponent } from './MyComponents/sidenav/sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SyncHeaderComponent } from './MyComponents/sync-header/sync-header.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    SyncPageComponent,
    SyncDataComponent,
    NewSyncPageComponent,
    HeaderComponent,
    SidenavComponent,
    SyncHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    RoundProgressModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
