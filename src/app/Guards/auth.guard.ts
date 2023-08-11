import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LoginServiceService } from '../MyServices/login-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: LoginServiceService, private router: Router, private toast: NgToastService, private spinner: NgxSpinnerService) { }

  canActivate(): any {
    this.spinner.show()
    if (this.service.isLoggedIn()) {
      this.spinner.hide()
      return true;
    } else {
      this.spinner.hide()
      this.toast.error({ detail: 'Error', summary: 'Please login First!', duration: 3000 })
      this.router.navigate(['login'])
      return false;
    }
  }
}