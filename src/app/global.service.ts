import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';

import Swal from 'sweetalert2';
const swal = Swal;
@Injectable()
export class GlobalService {

  api = "http://api.usl.edu.ph/api/";
  token
  header = new Headers();
  option:any;
  email=''
  sy='2021221'
  constructor() {
     
  }

  requestToken(){
    this.header.append("Content-Type", "application/json");
    this.option = new RequestOptions({ headers: this.header });
    return this.option
  }


  swalAlert(title,text,type)
  {
    swal.fire({
          type: type,
          title: title,
          html: text,
           allowEnterKey:false,
         },
          )
  }  

   swalInfo(title,text,type)
  {
    Swal.fire(
      title,
      text,
      type
    )
  }  

  swalSuccess()
  {
    swal.fire({
          type: 'success',
          title: 'Applicant information successfully submitted.',
          html: 'Please Standby for the announcement of your schedule. Your application has been added to our database. Thank you!',
           allowEnterKey:false,
         },
          )
  }

  swalSuccess2(bat){
    swal.fire({
      type: 'success',
      title: bat,
      showConfirmButton: false,
      timer: 1500
    })
  }

  swalLoading(val){
     swal.fire({
       title: val,allowOutsideClick: false,
      });
    swal.showLoading();
  }
  
  swalClose(){
    swal.close();
  }

  swalAlertError()
  {
   swal.fire('Connection Error!', 'USL Database Server may be down. Please try again later.', 'error');
  }
}
