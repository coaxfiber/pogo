import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../global.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { InputComponent } from './input/input.component';

import { Inject} from '@angular/core';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  vars
  proglevelval=''
  fullname=''

  currentstrand=''

  strandp1=''
  strandp2=''

  pcourse=''
  acourse1=''
  acourse2=''
  constructor(public dialog: MatDialog,public dialogRef: MatDialogRef<MainComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private global: GlobalService,private http: Http) { }

  ngOnInit() {
    this.vars=this.data.data
    for (var i = 0; i < this.data.proglevel.length; ++i) {
      if (this.data.proglevel[i].programLevel == this.vars.ProgramLevel) {
        this.proglevelval = this.data.proglevel[i].progLevelDesc
      }
    }
    for (var i = 0; i < this.data.strand.length; ++i) {
      if (this.data.strand[i].strandId == this.vars.StrandId) {
        this.currentstrand = this.data.strand[i].strandTitle
      }
    }
    for (var i = 0; i < this.data.strand.length; ++i) {
      if (this.data.strand[i].strandId == this.vars.SHS_PriorityStrandID1) {
        this.strandp1 = this.data.strand[i].strandTitle
      }
    }
    for (var i = 0; i < this.data.strand.length; ++i) {
      if (this.data.strand[i].strandId == this.vars.SHS_PriorityStrandID2) {
        this.strandp2 = this.data.strand[i].strandTitle
      }
    }


    for (var i = 0; i < this.data.courses.length; ++i) {
      if (this.data.courses[i].programId == this.vars.PreferredCourseId) {
        this.pcourse = this.data.courses[i].course
      }
    }
    for (var i = 0; i < this.data.courses.length; ++i) {
      if (this.data.courses[i].programId == this.vars.AlternativeCourseId1) {
        this.acourse1 = this.data.courses[i].course
      }
    }
    for (var i = 0; i < this.data.courses.length; ++i) {
      if (this.data.courses[i].programId == this.vars.AlternativeCourseId2) {
        this.acourse2 = this.data.courses[i].course
      }
    }
    console.log(this.data.data)
    console.log(this.data.strand)
    console.log(this.data.courses)
    console.log(this.data.gradcourses)
    this.fullname = this.vars.LastName + ', ' + this.vars.FirstName + " " + this.vars.MiddleName +" " + this.vars.SuffixName
   
  }
	
}
