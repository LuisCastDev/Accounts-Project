import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  accountForm: FormGroup;

  banks : string [] = [
    'Banreservas',
    'Popular',
    'BHD',
    'ScotiaBank',
    'Progreso'
  ];
  accountTypes : string [] =[
    'Ahorro',
    'Corriente',
    'Nomina',
    'En dolares'
  ];

  constructor(
    private _fb : FormBuilder, 
    private _accountService : AccountService,
    private _dialogRef : MatDialogRef<AddAccountComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
    ){
    this.accountForm = this._fb.group({
      accountNumber: '',
      bank: '',
      accountType:'',
      isActive: true,
      transactions: null
    })
  }
  ngOnInit(): void {
    this.accountForm.patchValue(this.data)
  }
  onFormSubmit(){
    if (this.accountForm.valid){
      
     

      const newAccountData = {
        number: `${this.accountForm.value.accountNumber}`,
        description:`${this.accountForm.value.bank} ${this.accountForm.value.accountType}`,
        isActive : this.accountForm.value.isActive,
        transactions: this.accountForm.value.transactions        
      }
      console.log(newAccountData)
      this._accountService.createAccount(newAccountData).subscribe({
        next: (val: any)=>{
          alert('Cuenta creada correctamente');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    
     
    }

  }

  closeDialog(){
    this._dialogRef.close();
  }

}
