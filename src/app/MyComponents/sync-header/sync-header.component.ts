import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/MyServices/login-service.service';
import { SyncDataService } from 'src/app/MyServices/sync-data.service';
@Component({
  selector: 'app-sync-header',
  templateUrl: './sync-header.component.html',
  styleUrls: ['./sync-header.component.css']
})
export class SyncHeaderComponent {
  @Output() sideNavToogled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  Company: any;
  UserName: any;
  UserData: any;
  constructor(private route: Router, private login: LoginServiceService, private syncData: SyncDataService) { }
  ngOnInit(): void {
    this.UserName = this.login.getUserName();
    this.Company = this.login.getCompanyName();
    this.UserData = { "Username": this.UserName, "AccessToken": "", "CompanyId": "", "SsnNo": "", "Password": "" }
    this.login.SyncStatus(this.UserData).subscribe({
      next: (res) => {
        if (res.qbCompanyName && res.qbCompanyName != "undefined" && res.qbCompanyName != "") {
          this.login.storeCompanyName(res.qbCompanyName)
          this.Company = res.qbCompanyName
        }
      }, error: (err) => {
        throw Error(err)
      }
    })

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
