import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Inject} from '@angular/core';
@Component({
  selector: 'app-merchzoom',
  templateUrl: './merchzoom.component.html',
  styleUrls: ['./merchzoom.component.css']
})
export class MerchzoomComponent implements OnInit {

  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<MerchzoomComponent>,@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
  }
closethis(): void {
       this.dialogRef.close({result:'cancel'});
  }
}
