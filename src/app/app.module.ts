import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
// Petani
import { TabsPage } from '../pages/petani/tabs-petani/tabs';
import { AspirasiPage } from '../pages/petani/aspirasi/aspirasi';
import { TambahAspirasiPage } from '../pages/petani/tambah-aspirasi/tambah-aspirasi';
import { KirimStatusProduksiPage } from '../pages/petani/kirim-status-produksi/kirim-status-produksi';
import { PendukungPage } from '../pages/petani/pendukung/pendukung';
import { StatusProduksiPage } from '../pages/petani/status-produksi/status-produksi';
import { ProfilePetaniPage } from '../pages/petani/profile-petani/profile';
// Masyarakat
import { TabsMasyarakatPage } from '../pages/masyarakat/tabs-masyarakat/tabs-masyarakat';
import { OperasiPasarPage } from '../pages/masyarakat/operasi-pasar/operasi-pasar';

import { InfoHargaPage } from '../pages/info-harga/info-harga';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { SignupPage } from '../pages/signup/signup';
import { SignupPilihanPage } from '../pages/signup-pilihan/signup-pilihan';
import { LoginPage } from '../pages/login/login';

import { UserData } from '../providers/user-data';
import { ConferenceData } from '../providers/conference-data';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TabsMasyarakatPage,
    AspirasiPage,
    InfoHargaPage,
    ProfilePage,
    ProfilePetaniPage,
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
    TabsMasyarakatPage,
    AspirasiPage,
    InfoHargaPage,
    ProfilePage,
    ProfilePetaniPage,
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
