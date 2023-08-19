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
  UserData: any;
  constructor(private route: Router, private login: LoginServiceService) { }
  ngOnInit(): void {
    this.UserName = this.login.getUserName();
    if (this.login.getCompanyName()) {
      this.Company = this.login.getCompanyName();
    } else {
      this.UserData = { "Username": this.UserName, "AccessToken": "", "CompanyId": "", "SsnNo": "", "Password": "" }
      this.login.SyncStatus(this.UserData).subscribe({
        next: (res) => {
          if (res.qbCompanyName && res.qbCompanyName != "undefined" && res.qbCompanyName != "") {
            this.login.storeCompanyName(res.qbCompanyName)
            this.Company = res.qbCompanyName
          }
        },
        error: (err) => {
          throw Error(err)
        }
      })
    }


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
