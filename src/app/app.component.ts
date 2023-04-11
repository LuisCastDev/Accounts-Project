import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddAccountComponent } from './add-account/add-account.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Accounts-Project';

  constructor(private _dialog: MatDialog){}

  openAddAccountForm(){
  this._dialog.open(AddAccountComponent);

  }
}
