import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<TermsComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { 
 	
  }

  closethis(){
       this.dialogRef.close({result:'ok'});
  }
  ngOnInit() {
  }

}
