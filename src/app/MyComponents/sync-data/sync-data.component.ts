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
  UserID: any;
  ngOnInit(): void {
    this.loading = "none";
    this.username = this.login.getUserName()
    this.UserID = sessionStorage.getItem('UserId')
    this.spinner.show();
    this.syncData.getSyncDataCount(this.UserID, true).subscribe({
      next: (res) => {
        this.loading = ""
        this.spinner.hide()
        this.syncCount = res.data.progressPkg;
        this.totalCount = res.data.progressPkg;
      },
      error: (err) => {
        this.syncData.getSyncDataCount(this.UserID, true).subscribe({
          next: (res) => {
            this.loading = ""
            this.spinner.hide()
            this.syncCount = res.data.progressPkg;
            this.totalCount = res.data.progressPkg;
          }, error: (err) => {
            this.syncData.getSyncDataCount(this.UserID, true).subscribe({
              next: (res) => {
                this.loading = ""
                this.spinner.hide()
                this.syncCount = res.data.progressPkg;
                this.totalCount = res.data.progressPkg;
              },
              error: (err) => {
                this.spinner.hide()
                this.toast.error({ detail: "Error", summary: "Something went wrong", duration: 2000 })
                throw Error(err)
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
    this.syncData.getSyncDataCount(this.UserID, false).subscribe({
      next: (res) => {
        this.spinner.hide()
        if (res.data.progressPkg && res.data.progressPkg.length > 0) {
          for (let i = 0; i < res.data.progressPkg.length; i++) {
            if (res.data.progressPkg[i].pkg && res.data.progressPkg[i].pkg.length > 0) {
              for (let j = 0; j < res.data.progressPkg[i].pkg.length; j++) {
                this.syncCount[i].pkg[j].processCount = res.data.progressPkg[i].pkg[j].processCount
              }
            }
          }

          for (let i = 0; i < res.data.progressPkg.length; i++) {
            if (res.data.progressPkg[i].pkg && res.data.progressPkg[i].pkg.length > 0) {
              for (let j = 0; j < res.data.progressPkg[i].pkg.length; j++) {
                if (this.syncCount[i].pkg[j].totalCount != res.data.progressPkg[i].pkg[j].processCount) {
                  this.allItems = false;
                  break
                }
              }
            }
            if (!this.allItems) {
              break
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
      }, error: (err) => {
        throw Error(err)
      }
    })
  }
}
