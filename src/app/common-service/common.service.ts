import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl= 'https://localhost:7244/api/';

  constructor(private http: HttpClient) { }



  postEmployee(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}Employee`, data);
  }

  sendEmail(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}Employee/sendemail`, data)
  }

  getEmployee(){
    return this.http.get<any[]>(`${this.baseUrl}Employee`);
  }
  


}
