import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginServiceService } from 'src/app/MyServices/login-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private profile: LoginServiceService,
    private route: Router,
    private toast: NgToastService,
    private spinner: NgxSpinnerService
  ) { }
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  formModal: any;
  login!: FormGroup;
  companyid: any = { "CompanyId": 0 }
  companydata: any;
  selectedCompany: any;

  ngOnInit(): void {
    sessionStorage.clear();
    this.profile.getCompany(this.companyid).subscribe((res) => {
      this.companydata = res.Payload
      this.selectedCompany = { "CompanyId": this.companydata[0].COMPANYID, "CompanySSNO": this.companydata[0].SSNNO }
    });
    this.login = this.fb.group({
      UserId: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
  hideshowpass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }
  UserData: any = [];
  update($event: any) {
    this.selectedCompany = { "CompanyId": $event.currentTarget.options[$event.currentTarget.options.selectedIndex].id, "CompanySSNO": $event.target.value }
  }
  loginTest() {
    this.spinner.show();
    sessionStorage.clear();
    if (this.login.valid && this.selectedCompany) {
      this.profile.storePassword(this.login.value.Password)
      this.profile.verifyProfile(this.login.value).subscribe({
        next: (result) => {
          if (result.Payload[0].Authorization == 'Success') {
            this.profile.storeUserName(result.Payload[0].userName);
            this.profile.storeAccessToken(result.Payload[0].access_token);
            this.UserData = { "Username": result.Payload[0].userName, "AccessToken": result.Payload[0].access_token, "CompanyId": this.selectedCompany.CompanyId, "SsnNo": this.selectedCompany.CompanySSNO, "Password": this.profile.getPassword() }
            this.profile.SyncStatus(this.UserData).subscribe({
              next: (res) => {
                sessionStorage.setItem('UserId', res.userID)
                sessionStorage.removeItem('Password')
                this.profile.storeCompanyName(res.qbCompanyName)
                if (res.status == 'sync') {
                  this.toast.success({
                    detail: 'SUCCESS',
                    summary: 'Successfully Logged In',
                    duration: 3000,
                  });
                  this.route.navigate(['NewSyncPage'])
                }
                else if (res.status == 'Not sync') {
                  this.toast.success({
                    detail: 'SUCCESS',
                    summary: 'Successfully Logged In',
                    duration: 3000,
                  });
                  this.route.navigate(['Home'])
                }
              },
              error: (err) => {
                this.spinner.hide()
                this.toast.error({ detail: 'ERROR', summary: 'Something went wrong', duration: 3000 })
              }
            })
            this.login.reset();
          } else {
            this.spinner.hide();
            this.toast.error({
              detail: 'Error',
              summary: 'Invalid Credentials Try Again',
              duration: 2000,
            });
          }

        },
        error: (err) => {

          if (err.error.status == 'Not sync') {
            this.spinner.hide();
            this.profile.storeId(err.error.id);
            this.route.navigate(['Home']);
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Successfully Logged In',
              duration: 3000,
            });
          } else {
            this.spinner.hide();
            this.toast.error({
              detail: 'Error',
              summary: err.error.status,
              duration: 2000,
            });
          }
        },
      });
    } else if (this.login.invalid) {
      this.spinner.hide();
      this.toast.error({
        detail: 'Error',
        summary: 'Invalid Credentials',
        duration: 2000,
      });
    }
  }
}
