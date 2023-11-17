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
  UserId: any;
  data: any;
  syncDatas: any;
  displayStyle = "none";
  current: any = 50;
  max: any = 100;
  loading: any = "none";
  onChangeInput($event: any) {
    var id: any
    if ($event.target.dataset.parentid) {
      id = ($event.target.dataset.parentid.split(","))
      const isChecked = $event.target.checked;
      const value = $event.target.value;
      this.syncDatas = this.syncDatas.map((d: any, i: any) => {
        for (let j = 0; j < id.length; j++) {
          const checkbox1 = document.querySelector<HTMLInputElement>(`[id="${id[j]}"][value="1"]`);
          const checkbox2 = document.querySelector<HTMLInputElement>(`[id="${id[j]}"][value="2"]`);
          const checkbox3 = document.querySelector<HTMLInputElement>(`[id="${id[j]}"][value="3"]`);
          if (d.id == id[j] && value == 1 || d.id == id && value == 1) {
            d.optionValue1 = isChecked;
            if (checkbox1) {
              checkbox1.disabled = isChecked;
            }
            if (d.optionValue1 == false || d.optionValue2 == false) {
              d.optionValue3 = false;
              if (checkbox3) {
                checkbox3.disabled = false;
              }
              return d;
            }
            if (d.optionValue1 == true && d.optionValue2 == true) {
              d.optionValue3 = true;
              if (checkbox3) {
                checkbox3.disabled = true;
              }
              return d;
            }
            return d;
          }
          if (d.id == id[j] && value == 2 || d.id == id && value == 2) {
            d.optionValue2 = isChecked;
            if (checkbox2) {
              checkbox2.disabled = isChecked;
            }
            if (d.optionValue1 == false || d.optionValue2 == false) {
              d.optionValue3 = false;
              if (checkbox3) {
                checkbox3.disabled = false;
              }
              return d;
            }
            if (d.optionValue1 == true && d.optionValue2 == true) {
              d.optionValue3 = true;
              if (checkbox3) {
                checkbox3.disabled = true;
              }
              return d;
            }
            return d;
          }
          if (d.id == id[j] && value == 3 || d.id == id && value == 3) {
            d.optionValue1 = isChecked;
            d.optionValue2 = isChecked;
            d.optionValue3 = isChecked;
            if (checkbox3 && checkbox1 && checkbox2) {
              checkbox1.disabled = isChecked;
              checkbox3.disabled = isChecked;
              checkbox2.disabled = isChecked;
            }
            return d;
          }
        }

        return d;
      });
    }
    if ($event.target.id) {
      id = ($event.target.id)
      const isChecked = $event.target.checked;
      const value = $event.target.value;
      this.syncDatas = this.syncDatas.map((d: any, i: any) => {
        for (let j = 0; j < id.length; j++) {
          if (d.id == id[j] && value == 1 || d.id == id && value == 1) {
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
          if (d.id == id[j] && value == 2 || d.id == id && value == 2) {
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
          if (d.id == id[j] && value == 3 || d.id == id && value == 3) {
            d.optionValue1 = isChecked;
            d.optionValue2 = isChecked;
            d.optionValue3 = isChecked;
            return d;
          }
        }

        return d;
      });

    }
    this.syncDatas.forEach((s: any) => {
      setTimeout(() => this.applyCheckboxDisablingLogic(s), 0);
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
    this.UserId = sessionStorage.getItem('UserId')
    this.syncData.getSyncData(this.UserId).subscribe({
      next: (res) => {
        this.loading = ""
        this.spinner.hide()
        this.frequency = res.package.interval
        if (res.package.quickBookCompanyName && res.package.quickBookCompanyName != "undefined" && res.package.quickBookCompanyName != "") {
          this.login.storeCompanyName(res.package.quickBookCompanyName)
        }
        this.parentId = res.package.modules
        this.syncDatas = res.package.modulePkg;
        this.syncDatas.forEach((s: any) => {
          setTimeout(() => this.applyCheckboxDisablingLogic(s), 0);
        });
        this.assignData = res.package.assignModules;
        this.parentselector = res.package.isFirstLoad;
        if (this.parentselector === true) {
          this.savebtn = '';
          this.updatebtn = 'none';
        } else {
          this.savebtn = 'none';
          this.updatebtn = '';
        }
      }, error: (err) => {
        throw Error(err)
      }
    });
    this.spinner.show();
  }
  applyCheckboxDisablingLogic(s: any): void {
    if (s.parentID && s.optionValue1) {
      const parentIDs = s.parentID.split(",");
      parentIDs.forEach((parentID: any) => {
        const checkboxes = document.querySelectorAll(`[id="${parentID}"][value="1"]`);
        checkboxes.forEach((checkbox: any) => {
          checkbox.disabled = true;
          checkbox.checked = true;
        });
      });
    }
    if (s.parentID && s.optionValue2) {
      const parentIDs = s.parentID.split(",");
      parentIDs.forEach((parentID: any) => {
        const checkboxes = document.querySelectorAll(`[id="${parentID}"][value="2"]`);
        checkboxes.forEach((checkbox: any) => {
          checkbox.disabled = true;
          checkbox.checked = true;
        });
      });
    }
    if (s.parentID && s.optionValue3) {
      const parentIDs = s.parentID.split(",");
      parentIDs.forEach((parentID: any) => {
        const checkboxes = document.querySelectorAll(`[id="${parentID}"][value="3"]`);
        checkboxes.forEach((checkbox: any) => {
          checkbox.disabled = true;
          checkbox.checked = true;
        });
      });
    }

  }
  value = 20;
  bufferValue = 75;
  Count: any;
  interval: any;
  spinner1 = 'sp1';
  Loading: any = false;
  sideNavStatus: boolean = false;
  frequency: any = "EveryDay";
  parentId: any;

  onSelected(value: string): void {
    this.frequency = value;
    this.syncData.SetInterval(this.UserId, this.frequency).subscribe({
      next: (res) => {
        console.log(res)
      }, error: (err) => {
        throw (err)
      }
    })
  }
  alertConfirmation() {
    var isNotChecked: boolean = false;
    for (let i = 0; i < this.syncDatas.length; i++) {
      const ParentId = this.syncDatas[i].parentID.split(",")
      if (ParentId != "" && ParentId) {
        if (this.syncDatas[i].optionValue1) {
          ParentId.forEach((id: any) => {
            const check = document.querySelectorAll(`[id="${id}"][value="1"]`);
            check.forEach((check: any) => {
              if (check.checked != true) {
                isNotChecked = true
              }

            })
          })
        }
        if (this.syncDatas[i].optionValue2) {
          ParentId.forEach((id: any) => {
            const check = document.querySelectorAll(`[id="${id}"][value="2"]`);
            check.forEach((check: any) => {
              if (check.checked != true) {
                isNotChecked = true
              }
            })
          })
        }
        if (this.syncDatas[i].optionValue3) {
          ParentId.forEach((id: any) => {
            const check = document.querySelectorAll(`[id="${id}"][value="3"]`);
            check.forEach((check: any) => {
              if (check.checked != true) {
                isNotChecked = true
              }
            })
          })
        }
      }
      if (isNotChecked) {
        this.toast.error({ summary: "Please select Items and Customers ", detail: "Error", duration: 3000 })
        break
      }
    }
    if (!isNotChecked) {
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
          this.Sync();
          Swal.fire({
            title: 'Your data sync is in progress.',
            text: 'You can click on the button below to check the status.',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'Check Status',
          }).then((result) => {
            if (result.value) {
              this.route.navigate(['SyncStatus'])
            } else if (result.dismiss === Swal.DismissReason.backdrop) {
              this.route.navigate(['NewSyncPage'])
            }

          }
          );
          this.Loading = ""

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

  }
  Sync() {
    this.UserId = sessionStorage.getItem('UserId')
    this.syncData
      .saveSyncStatus(this.syncDatas, this.UserId, this.frequency)
      .subscribe({
        next: (res) => {
          this.syncData.dataSync(this.UserId).subscribe((res) => {
          })
          this.toast.success({
            detail: 'Success',
            summary: 'Configuration Updated Successfully',
            duration: 3000,
          });
          return true;
        },
        error: (err) => {
          throw (err)
        },
      });
  }
  updatebtn = 'none';
  savebtn = '';
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
    clearInterval(this.interval);
    this.Count = [{}];
  }
}
