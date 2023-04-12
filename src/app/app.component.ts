import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { AddAccountComponent } from './add-account/add-account.component';
import { CheckEditAccountComponent } from "./check-edit-account/check-edit-account.component";
import { AccountService } from './services/account.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'accountId',
    'number',
    'description', 
    'isActive',
    'action'
    
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _accountService : AccountService
    ){}

  ngOnInit(): void {
    this.getAccountList();
  }


  openAddAccountForm(){
  const dialogRef =this._dialog.open(AddAccountComponent);
    dialogRef.afterClosed().subscribe({
      next: (val)=>{
        if(val){
          this.getAccountList()
        }
      }
    })
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteAccount(id :number){
    this._accountService.deleteAccount(id).subscribe({
      next:(res)=>{
        alert("Cuenta eliminada correctamente");
        this.getAccountList();
      },
      error:(err) =>{
        console.log(err);
      }
    })
  }

  getAccountForm(data: any){
    console.log(data,'esta es la data que recibo')
  this._dialog.open(CheckEditAccountComponent,{
    data,});
     
  }

  getStatus(value : true){
    return value === true? 'activa' : 'inactiva'
  }
  
}
