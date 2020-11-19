import { Injectable } from '@angular/core';

import {Headers, RequestOptions} from '@angular/http';
import Swal from 'sweetalert2';
const swal = Swal;
@Injectable()
export class GlobalService {
 email
 logged=false
  constructor() {
     
  }


  pictureshow(merchid,img){

  	swal.fire({
          html: '<img src="'+img+'" style="width:100%;"><p style="text-align:center;">Merch ID: <b>'+merchid+'</b></p>',
         })
  }
}
