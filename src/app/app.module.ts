import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GlobalService } from './global.service';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { InfoComponent } from './info/info.component';
import { InputComponent } from './main/input/input.component';
import { HttpModule } from '@angular/http';


import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider
} from 'angularx-social-login';

//import { NgxQRCodeModule } from 'ngx-qrcode2';
import { HomeComponent } from './home/home.component';
import { MerchComponent } from './merch/merch.component';
import { MerchzoomComponent } from './merch/merchzoom/merchzoom.component';

import { QRCodeModule } from 'angularx-qrcode';
import {NgxWebstorageModule} from 'ngx-webstorage';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    InfoComponent,
    InputComponent,
    HomeComponent,
    MerchComponent,
    MerchzoomComponent,
  ],
  entryComponents: [
    InputComponent,
    MerchzoomComponent
   ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    SocialLoginModule,
    QRCodeModule,
    NgxWebstorageModule.forRoot(),
    //NgxQRCodeModule
  ],
  providers: [GlobalService,{
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '100400588236-rhpnguqginvpo91n12q1e201qe62ce1d.apps.googleusercontent.com'
            ),
          }
        ],
      } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
