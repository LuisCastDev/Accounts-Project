import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _http : HttpClient) { }

  url : string ='https://localhost:7101/api/';
  turl : string = 'https://localhost:7101/api/transactions'
  
  createAccount(data : any): Observable<any> {
    console.log(data)
    return this._http.post(this.url+'accounts/create',data);
  }

  getAccountList(): Observable<any> {
    return this._http.get( this.url+'accounts/');
  }
  getAccount(id : number): Observable<any> {
    return this._http.get( this.url+'accounts/'+`${id}`);
  }
  deleteAccount(id : number): Observable<any> {
    console.log(this.url+'accounts/delete/'+`${id}`)
    return this._http.delete( this.url+'accounts/delete/'+`${id}`);
  }

  getTransactions(id : number): Observable<any> {
    return this._http.get( this.url+`transactions/${id}`);
  }
  getAccountBalance(id : number): Observable<any> {
    return this._http.get( this.url+`transactions/balance/${id}`);
  }

  makeTransaction(data : any): Observable<any> {
    console.log(data)
    return this._http.post(this.url+'transactions',data);
  }

}
