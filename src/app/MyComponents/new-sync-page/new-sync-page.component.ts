import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginServiceService } from 'src/app/MyServices/login-service.service';
import { SyncDataService } from 'src/app/MyServices/sync-data.service';

@Component({
  selector: 'app-new-sync-page',
  templateUrl: './new-sync-page.component.html',
  styleUrls: ['./new-sync-page.component.css']
})
export class NewSyncPageComponent {
  ngOnInit(): void {
    this.loading = "none";
    this.username = this.login.getUserName()
    this.syncData.getTotalCount(this.username).subscribe({
      next: (res) => {
        this.loading = ""
        this.spinner.hide()
        this.syncCount = res.data.moduleSyncpkg;
        this.totalCount = res.data.lastSyncDate;
      }, error: (err) => {
        throw Error(err)
      }
    })
  }
  constructor(private route: Router, private spinner: NgxSpinnerService, private syncData: SyncDataService, private login: LoginServiceService, private toast: NgToastService) { }
  username: any;
  syncCount: any;
  totalCount: any;
  loading: any = "";
  sideNavStatus: boolean = false;
  mode = new FormControl('over' as MatDrawerMode);
  configure() {
    this.route.navigate(['sync'])
  }
}
