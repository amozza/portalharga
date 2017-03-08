import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { AspirasiPage } from '../pages/aspirasi/aspirasi';
import { InfoHargaPage } from '../pages/info-harga/info-harga';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { TambahAspirasiPage } from '../pages/tambah-aspirasi/tambah-aspirasi';
import { SignupPage } from '../pages/signup/signup';
import { SignupPilihanPage } from '../pages/signup-pilihan/signup-pilihan';
import { LoginPage } from '../pages/login/login';
import { OperasiPasarPage } from '../pages/operasi-pasar/operasi-pasar';
import { StatusProduksiPage } from '../pages/status-produksi/status-produksi';
import { KirimStatusProduksiPage } from '../pages/kirim-status-produksi/kirim-status-produksi';
import { PendukungPage } from '../pages/pendukung/pendukung';

import { UserData } from '../providers/user-data';
import { ConferenceData } from '../providers/conference-data';

import { AuthHttp, AuthConfig, AUTH_PROVIDERS   } from 'angular2-jwt';
import { Http, RequestOptions } from '@angular/http';

/*let storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: 'token',
    noJwtError: true,
    globalHeaders: [{'Content-Type': 'application/json'}],
    tokenGetter: (() => storage.get('token')),
  }), http);
}

function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
        tokenGetter: (() => sessionStorage.getItem('token')),
        globalHeaders: [{'Content-Type':'application/json'}],
    }), http, options);
}*/

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AspirasiPage,
    InfoHargaPage,
    ProfilePage,
    ProfileEditPage,
    TambahAspirasiPage,
    SignupPage,
    SignupPilihanPage,
    LoginPage,
    OperasiPasarPage,
    StatusProduksiPage,
    KirimStatusProduksiPage,
    PendukungPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AspirasiPage,
    InfoHargaPage,
    ProfilePage,
    ProfileEditPage,
    TambahAspirasiPage,
    SignupPage,
    SignupPilihanPage,
    LoginPage,
    OperasiPasarPage,
    StatusProduksiPage,
    KirimStatusProduksiPage,
    PendukungPage
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  ConferenceData,
  UserData,
  Storage
  ]
})
export class AppModule {}
