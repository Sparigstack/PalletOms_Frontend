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
        this.syncCount = res.data;
        this.totalCount = res.data;
        console.log(res.data[0].moduleName, res.data[0].pkg)
      },
      error: (err) => {
        this.syncData.getSyncDataCount(this.username, true).subscribe({
          next: (res) => {
            this.loading = ""
            this.spinner.hide()
            this.syncCount = res.data;
            this.totalCount = res.data;
            console.log(res.data[0].moduleName, res.data[0].pkg)
          }, error: (err) => {
            this.syncData.getSyncDataCount(this.username, true).subscribe({
              next: (res) => {
                this.loading = ""
                this.spinner.hide()
                this.syncCount = res.data;
                this.totalCount = res.data;
                console.log(res.data[0].moduleName, res.data[0].pkg)
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
      console.log(res.data)
      this.spinner.hide()
      if (res.data && res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].pkg && res.data[i].pkg.length > 0) {
            for (let j = 0; j < res.data[i].pkg.length; j++) {
              this.syncCount[i].pkg[j].processCount = res.data[i].pkg[j].processCount
              if (this.syncCount[i].pkg[j].totalCount !== res.data[i].pkg[j].processCount) {
                this.allItems = false
                break;
              } else {
                this.allItems = true
              }
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
