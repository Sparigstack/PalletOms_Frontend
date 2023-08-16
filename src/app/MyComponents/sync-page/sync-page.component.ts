import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginServiceService } from 'src/app/MyServices/login-service.service';
import { SyncDataService } from 'src/app/MyServices/sync-data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sync-page',
  templateUrl: './sync-page.component.html',
  styleUrls: ['./sync-page.component.css'],
})

export class SyncPageComponent implements OnInit {
  assignData: any;
  id: any;
  Username: any;
  data: any;
  syncDatas: any;
  displayStyle = "none";
  current: any = 50;
  max: any = 100;
  loading: any = "none";
  onChangeInput($event: any) {
    const id = $event.target.id;
    const isChecked = $event.target.checked;
    const value = $event.target.value;
    this.syncDatas = this.syncDatas.map((d: any) => {
      if (d.id == id && value == 1) {
        d.optionValue1 = isChecked;
        if (d.optionValue1 == false || d.optionValue2 == false) {
          d.optionValue3 = false;
          return d;
        }
        if (d.optionValue1 == true && d.optionValue2 == true) {
          d.optionValue3 = true;
          return d;
        }
        return d;
      }
      if (d.id == id && value == 2) {
        d.optionValue2 = isChecked;
        if (d.optionValue1 == false || d.optionValue2 == false) {
          d.optionValue3 = false;
          return d;
        }
        if (d.optionValue1 == true && d.optionValue2 == true) {
          d.optionValue3 = true;
          return d;
        }
        return d;
      }
      if (d.id == id && value == 3) {
        d.optionValue1 = isChecked;
        d.optionValue2 = isChecked;
        d.optionValue3 = isChecked;
        return d;
      }
      return d;
    });
  }
  parentselector: boolean = false;
  constructor(
    private syncData: SyncDataService,
    private login: LoginServiceService,
    private toast: NgToastService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) {
    this.Username = this.login.getUserName();
  }
  ngOnInit(): void {
    this.syncData.getSyncData(this.Username).subscribe({
      next: (res) => {
        this.loading = ""
        this.spinner.hide()
        this.login.storeCompanyName(res.package.quickBookCompanyName)
        this.syncDatas = res.package.modulePkg;
        this.assignData = res.package.assignModules;
        this.parentselector = res.package.isFirstLoad;
        if (this.parentselector === true) {
          this.savebtn = '';
          this.updatebtn = 'none';
        } else {
          this.savebtn = 'none';
          this.updatebtn = '';
        }
      },
    });
    this.spinner.show();
  }
  UserId: any;
  value = 20;
  bufferValue = 75;
  Count: any;
  interval: any;
  spinner1 = 'sp1';
  Loading: any = false;
  sideNavStatus: boolean = false;
  frequency: any = "EveryDay";


  onSelected(value: string): void {
    this.frequency = value;
  }
  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure You?',
      text: 'It will take some time to reflect Data in your system',
      icon: 'warning',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think',


    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Your data sync is in progress.',
          text: 'You can click on the button below to check the status.',
          icon: 'success',
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Check Status',
        }).then((result) => {
          this.route.navigate(['SyncStatus'])
        });
        this.Loading = ""
        this.Sync();
        // this.toast.success({
        //   detail: 'Success',
        //   summary: 'Configuration Saved Successfully',
        //   duration: 3000,
        // });
        // Swal.fire('Updated!', 'Your preference is Updated successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Cancelled', 'Process Cancelled', 'error');
        this.toast.success({
          detail: 'Cancelled',
          summary: 'Process Cancelled',
          duration: 3000,
        });
      }
    });
  }
  Sync() {
    this.syncData
      .saveSyncStatus(this.syncDatas, this.Username)
      .subscribe({
        next: (res) => {
          // this.syncData.dataSync(this.Username).subscribe((res) => {
          // })
          this.toast.success({
            detail: 'Success',
            summary: 'Configuration Updated Successfully',
            duration: 3000,
          });

        },
        error: (err) => {
          this.toast.error({
            detail: 'Error',
            summary: 'Some error Occurred',
            duration: 3000,
          });
        },
      });
  }
  updatebtn = 'none';
  savebtn = '';
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    debugger
    this.displayStyle = "none";
    clearInterval(this.interval);
    this.Count = [{}];
  }
}
