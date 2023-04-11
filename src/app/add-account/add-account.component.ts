import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { DialogRef } from '@angular/cdk/dialog';
@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent {

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
    private _dialogRef : DialogRef<AddAccountComponent>
    ){
    this.accountForm = this._fb.group({
      accountNumber: '',
      bank: '',
      accountType:'',
      isActive: true,
      transactions: null
    })
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
          this._dialogRef.close();
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
