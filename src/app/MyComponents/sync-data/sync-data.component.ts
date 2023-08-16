import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginServiceService } from 'src/app/MyServices/login-service.service';
import { SyncDataService } from 'src/app/MyServices/sync-data.service';

@Component({
  selector: 'app-sync-data',
  templateUrl: './sync-data.component.html',
  styleUrls: ['./sync-data.component.css']
})
export class SyncDataComponent {
  ngOnInit(): void {
    this.loading = "none";
    this.username = this.login.getUserName()
    this.spinner.show();
    this.syncData.getSyncDataCount(this.username, true).subscribe({
      next: (res) => {
        this.loading = ""
        this.spinner.hide()
        this.syncCount = res.data.progressPkg;
        this.totalCount = res.data.progressPkg;
      },
      error: (err) => {
        this.syncData.getSyncDataCount(this.username, true).subscribe({
          next: (res) => {
            this.loading = ""
            this.spinner.hide()
            this.syncCount = res.data.progressPkg;
            this.totalCount = res.data.progressPkg;
          }, error: (err) => {
            this.syncData.getSyncDataCount(this.username, true).subscribe({
              next: (res) => {
                this.loading = ""
                this.spinner.hide()
                this.syncCount = res.data.progressPkg;
                this.totalCount = res.data.progressPkg;
              },
              error: (err) => {

              }
            })
          }
        })
      }
    })
  }
  constructor(private route: Router, private spinner: NgxSpinnerService, private syncData: SyncDataService, private login: LoginServiceService, private toast: NgToastService) { }
  username: any;
  syncCount: any;
  totalCount: any;
  loading: any = "";
  sideNavStatus: boolean = false;
  refBtn: any = "flex";
  bkBtn: any = "none";
  allItems = true;
  goBack() {
    this.route.navigate(['NewSyncPage'])
  }
  refreshData() {
    this.spinner.show()
    this.syncData.getSyncDataCount(this.username, false).subscribe((res) => {
      this.spinner.hide()
      if (res.data.progressPkg && res.data.progressPkg.length > 0) {
        for (let i = 0; i < res.data.progressPkg.length; i++) {
          if (res.data.progressPkg[i].pkg && res.data.progressPkg[i].pkg.length > 0) {
            for (let j = 0; j < res.data.progressPkg[i].pkg.length; j++) {
              this.syncCount[i].pkg[j].processCount = res.data.progressPkg[i].pkg[j].processCount
              this.syncCount.forEach((syncItem: any, i: any) => {
                syncItem.pkg.forEach((pkgItem: any, j: any) => {
                  const totalCount = pkgItem.totalCount;
                  const processCount = res.data.progressPkg[i].pkg[j].processCount;

                  if (totalCount === processCount) {
                    this.allItems = true
                  } else {
                    this.allItems = false
                  }
                });
              });
            }
          }
        }
      }
      if (this.allItems) {
        this.refBtn = "none"
        this.bkBtn = "flex"
      } else {
        this.refBtn = "flex"
        this.bkBtn = "none"
      }
    })
  }
}
