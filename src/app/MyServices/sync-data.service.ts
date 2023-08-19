import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SyncDataService {
  url = 'https://localhost:7067/api/'
  //url = 'http://45.77.218.219:8081/api/';
  syncUrl = 'https://localhost:7185/api/SyncStatus/GetSyncStatus?UID=';
  constructor(private http: HttpClient) { }
  getSyncData(UserID: any): Observable<any> {
    return this.http.get(`${this.url}Module?UserID=${UserID}`);
  }
  syncStatus(Uid: any): Observable<any> {
    return this.http.get(`${this.syncUrl}${Uid}`);
  }
  saveSyncStatus(data: any, UserID: any, frequency: any): Observable<any> {
    return this.http.post(`${this.url}Module?UserID=${UserID}&interval=${frequency}`, data,);
  }
  getSyncDataCount(UserID: any, First: boolean): Observable<any> {
    return this.http.get(`${this.url}GetSyncData/SyncData?UserID=${UserID}&Isfirst=${First}`);
  }
  getTotalCount(UserID: any): Observable<any> {
    return this.http.get(`${this.url}ModuleDetails/ModuleDetails?UserID=${UserID}`);
  }
  dataSync(UserID: any): Observable<any> {
    return this.http.get(`${this.url}Module/DataSync?UserID=${UserID}`)
  }
  SetInterval(UserID: any, frequency: any): Observable<any> {
    return this.http.get(`${this.url}Module/SetInterval?UserID=${UserID}&interval=${frequency}`)
  }
}
