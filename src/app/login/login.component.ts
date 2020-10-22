import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TermsComponent } from './../terms/terms.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<LoginComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
    
  }

  closethis(){
       this.dialogRef.close({result:'ok'});
  }
  ngOnInit() {

  }

  terms(): void {
        const dialogRef = this.dialog.open(TermsComponent, {
          width: '600px', disableClose: false
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result.result!='cancel') {
            
          }
        });
      } 
}
