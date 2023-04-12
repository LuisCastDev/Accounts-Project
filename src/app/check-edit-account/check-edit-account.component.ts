
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-check-edit-account',
  templateUrl: './check-edit-account.component.html',
  styleUrls: ['./check-edit-account.component.scss']
})
export class CheckEditAccountComponent implements OnInit{
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  displayedColumns: string[] = [
    'accountId',
    'number',
    'description', 
    'isActive',
    'action'
    
  ];
  transactionDate :any;
  amt : any;
  balance :number = 0;

  accountForm: FormGroup;

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _fb : FormBuilder, 
    private _accountService : AccountService,
    private _dialogRef : MatDialogRef<CheckEditAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    ){
    
    this.accountForm = this._fb.group({
      number: '',
      description: '',
      isActive: true,
      transactions: null
    })
  }
   ngOnInit(): void {
    this.accountForm.patchValue(this.data)
    this.getAccountBalance(this.data.accountId)
    this.getTransactionList(this.data.accountId);
  }
  
  getAccountList(){
    this._accountService.getAccountList().subscribe({
      next: (res) => {
             
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      },
      error: (err) => {
        console.log(err)
      }
    })
  }
 

  closeDialog(){
    this._dialogRef.close();
  }
  getTransactionList(id : number){
    {
      this._accountService.getTransactions(id).subscribe({
        next: (res) => {
               
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
  
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
  getAccountBalance(id : number){
    {
      this._accountService.getAccountBalance(id).subscribe({
        next: (res) => {
               this.balance = res.balance;
          console.log(res.balance)
  
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
  
  getType(value : 0): string{
    return value === 0 ? 'Deposito' : 'Retiro'
  }
  getStatus(value : true){
    return value === true? 'activa' : 'inactiva'
  }

  makeDeposit(id:number,amt:number){
    if(amt >=0){
      const newDeposit = {
        accountId : id,
        account: null,
        date: this.transactionDate = new Date(),
        transactionType : 0,
        amount: amt,
        isActive: true
      }

      this._accountService.makeTransaction(newDeposit).subscribe({
        next: (val: any)=>{
          alert('Deposito fue hecho correctamente');
          this.getAccountBalance(this.data.accountId);
          this.getTransactionList(this.data.accountId);
        },
        error: (err: any) => {
          console.error(err)
        }
      })


    }
    else{
      alert('Inserte cantidad a depositar')
    }



  }

  makeWithdrawal(id:number,amt:number){
    console.log(this.amt)

    if(this.amt >=0){
      const newWithdrawal = {
        accountId : id,
        account: null,
        date: this.transactionDate = new Date(),
        transactionType : 1,
        amount: amt,
        isActive: true
      }

      this._accountService.makeTransaction(newWithdrawal).subscribe({
        next: (val: any)=>{
          alert('Deposito fue hecho correctamente');
          this.getAccountBalance(this.data.accountId);
          this.getTransactionList(this.data.accountId);
        },
        error: (err: any) => {
          console.error(err)
        }
      })


    }
    else{
      alert('Inserte cantidad a retirar')
    }

  }
  
  
}
