import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _http : HttpClient) { }

  url : string ='https://localhost:7101/api/'
  
  createAccount(data : any): Observable<any> {
    console.log(data)
    return this._http.post(this.url+'accounts/create',data);
  }

  getAccountList(): Observable<any> {
    return this._http.get( this.url+'accounts/');
  }
  getAccount(data : any): Observable<any> {
    return this._http.get( this.url+'accounts/',data);
  }
  deleteAccount(id : number): Observable<any> {
    console.log(this.url+'accounts/delete/'+`${id}`)
    return this._http.delete( this.url+'accounts/delete/'+`${id}`);
  }
}
