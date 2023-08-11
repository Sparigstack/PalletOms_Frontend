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
  getSyncData(Username: any): Observable<any> {
    return this.http.get(`${this.url}Module?Username=${Username}`);
  }
  syncStatus(Uid: any): Observable<any> {
    return this.http.get(`${this.syncUrl}${Uid}`);
  }
  saveSyncStatus(data: any, Username: any): Observable<any> {
    return this.http.post(`${this.url}Module?Username=${Username}`, data);
  }
  getSyncDataCount(Username: any, First: boolean): Observable<any> {
    return this.http.get(`${this.url}GetSyncData/SyncData?un=${Username}&Isfirst=${First}`);
  }
  getTotalCount(Username: any): Observable<any> {
    return this.http.get(`${this.url}ModuleDetails/ModuleDetails?un=${Username}`);
  }
  dataSync(UserName: any): Observable<any> {
    return this.http.get(`${this.url}Module/DataSync?Username=${UserName}`)
  }
}
