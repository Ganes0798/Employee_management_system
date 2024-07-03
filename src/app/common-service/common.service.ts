import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  baseUrl= 'https://localhost:7244/api/';

  constructor(private http: HttpClient) { }


  // Employee API

  postEmployee(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}Employee`, data);
  }

  sendEmail(data: any):Observable<any>{
    return this.http.post(`${this.baseUrl}Employee/sendemail`, data)
  }

  getEmployee(){
    return this.http.get<any[]>(`${this.baseUrl}Employee`);
  }

  updateEmployee(data:any){
    return this.http.patch(`${this.baseUrl}Employee`, data);
  }
  
  deleteData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}Employee/${id}`);
  }

  // Employee Designation API
  postDesignation(data:any): Observable<any>{
    return this.http.post(`${this.baseUrl}Roles`, data);
  }

  getDesignation(): Observable<any[]>{
      return this.http.get<any[]>(`${this.baseUrl}Roles`);
  }

  updateDesignation(data:any): Observable<any>{  
    return this.http.patch(`${this.baseUrl}Roles`, data);
  }


  deleteDesignation(id:number): Observable<any>{
      return this.http.delete<void>(`${this.baseUrl}Roles/${id}`);
  }


}
