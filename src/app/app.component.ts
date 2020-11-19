import { Component } from '@angular/core';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import {Http, Headers, RequestOptions} from '@angular/http';
import { GlobalService } from './global.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AfterViewInit, ElementRef, } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { InputComponent } from './main/input/input.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pogo';
  name = '';
   constructor(public dialog: MatDialog,private router: Router,private authService: SocialAuthService,private elRef:ElementRef,public global: GlobalService,private http: Http){
     if (sessionStorage.getItem("email")!=null) {
      this.global.logged = true
      this.name=sessionStorage.getItem("name")
     }
     this.router.navigate(['home']);
   }
  ngAfterViewInit() {
     let loader = this.elRef.nativeElement.querySelector('#loader'); 
     document.getElementById("loader").style.display = "none";
  }

loggedIn
signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      console.log(user)
      this.loggedIn = (user != null);
      if (user!=null) {
       this.global.email = user.email
       this.name = user.firstName
       this.global.logged = true
       sessionStorage.setItem("email",user.email);
       sessionStorage.setItem("name",user.firstName);
      }else{
        //this.global.swalAlert("Goolge Login Failed!",'Please Check your Internet Connectivity to proceed.','warning')
      }
    });
  }

  Logout(){
       sessionStorage.removeItem("email");
       sessionStorage.removeItem("name");location.reload();
  }


  openDialog(x): void {
    const dialogRef = this.dialog.open(InputComponent, {
      width: '500px',data:{type: x}, disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result!=undefined) {
      }
    });
  }
}
