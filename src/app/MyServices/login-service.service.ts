import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  //companyUrl = ' http://45.76.7.187:74/api/'
  //url = 'http://45.77.218.219:8081/api/';
  url = 'https://localhost:7067/api/'
  BaseUrl = 'http://45.76.7.187:74/api/'
  constructor(private http: HttpClient) { }
  getCompany(companyid: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}Company/GetCompanies`, companyid);
  }
  verifyProfile(data: any): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}User`, data);
  }
  SyncStatus(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}SyncStatus/SyncStatus`, data);
  }
  storeId(idValue: any) {
    sessionStorage.setItem('Id', idValue);
  }
  getId() {
    return sessionStorage.getItem('Id');
  }
  storeUserName(username: string) {
    sessionStorage.setItem('UserName', username)
  }
  getUserName() {
    return sessionStorage.getItem('UserName')
  }
  storeAccessToken(accessToken: string) {
    sessionStorage.setItem('AccessToken', accessToken)
  }
  getAccessToken() {
    sessionStorage.getItem('AccessToken')
  }
  storeCompanyName(company: any) {
    debugger
    sessionStorage.setItem('Company', company)
  }
  getCompanyName() {
    return sessionStorage.getItem('Company')
  }
  storePassword(pass: any) {
    sessionStorage.setItem('Password', pass)
  }
  getPassword() {
    return sessionStorage.getItem('Password')
  }
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('UserName')
  }
  storeTotalCount(name: any, count: any) {
    sessionStorage.setItem(name, count)
  }
  getTotalCount(name: any) {
    return sessionStorage.getItem(name)
  }
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
}
