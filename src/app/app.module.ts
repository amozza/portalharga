import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';
import { Transfer } from '@ionic-native/transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { FileOpener } from '@ionic-native/file-opener';
import { MyApp } from './app.component';

//General
import { PopoverPage } from '../pages/popover/popover';
import { SignupPage } from '../pages/signup/signup';
import { SignupPilihanPage } from '../pages/signup-pilihan/signup-pilihan';
import { LoginPage } from '../pages/login/login';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { VerifikasiAkunPage } from "../pages/verifikasi-akun/verifikasi-akun";

//providers
import { UserData } from '../providers/user-data';
import { RestProvider } from './../providers/rest';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Deeplinks } from '@ionic-native/deeplinks';

import { Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';

//component module
import { ComponentsModule } from './../components/components.module';

//set the auth http for API
export function getAuthHttp(http, Storage) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: "",
    noJwtError: true,
    globalHeaders: [{'Content-Type': 'application/json'}],
    tokenGetter: (() => {return Storage.get('token')}),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    SignupPilihanPage,
    LoginPage,
    PopoverPage,
    ForgetPasswordPage,
    VerifikasiAkunPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,  
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    FormsModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    SignupPilihanPage,
    LoginPage,
    PopoverPage,
    ForgetPasswordPage,
    VerifikasiAkunPage,
  ],
  providers: [
  StatusBar,
  SplashScreen,
  Deeplinks,  
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  UserData,
  RestProvider,
  SocialSharing,  
  Transfer,
  FileChooser,
  FileOpener,  
  File,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http, Storage]
    }
  ]
})
export class AppModule {}
