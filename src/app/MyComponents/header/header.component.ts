import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/MyServices/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() sideNavToogled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  Company: any;
  UserName: any;
  constructor(private route: Router, private login: LoginServiceService) { }
  ngOnInit(): void {
    this.Company = this.login.getCompanyName();
    this.UserName = this.login.getUserName();
  }
  sideNavToogle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToogled.emit(this.menuStatus);
  }
  signOut() {
    sessionStorage.clear()
    this.route.navigate(['login'])
  }
}
