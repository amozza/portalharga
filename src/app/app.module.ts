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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},ConferenceData, UserData, Storage]
})
export class AppModule {}
