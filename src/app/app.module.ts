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
import { TambahJualKomoditasPage } from '../pages/petani/tambah-jual-komoditas/tambah-jual-komoditas';
import { JualKomoditasPage } from '../pages/petani/jual-komoditas/jual-komoditas';
import { EditJualKomoditasPage } from '../pages/petani/edit-jual-komoditas/edit-jual-komoditas';
// Masyarakat
import { TabsMasyarakatPage } from '../pages/masyarakat/tabs-masyarakat/tabs-masyarakat';
import { OperasiPasarPage } from '../pages/masyarakat/operasi-pasar/operasi-pasar';
import { KirimOperasiPasarPage } from '../pages/masyarakat/kirim-operasi-pasar/kirim-operasi-pasar';
import { JualBeliPage } from '../pages/masyarakat/jual-beli/jual-beli';
import { TambahInfoHargaPage } from '../pages/masyarakat/tambah-info-harga/tambah-info-harga';
//General
import { InfoHargaPage } from '../pages/info-harga/info-harga';
import { PopoverPage } from '../pages/popover/popover';
import { GantiPasswordPage } from '../pages/ganti-password/ganti-password';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
import { SignupPage } from '../pages/signup/signup';
import { SignupPilihanPage } from '../pages/signup-pilihan/signup-pilihan';
import { LoginPage } from '../pages/login/login';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';

import { UserData } from '../providers/user-data';
import { ConferenceData } from '../providers/conference-data';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    TabsMasyarakatPage,
    JualBeliPage,
    AspirasiPage,
    TambahJualKomoditasPage,
    JualKomoditasPage,
    EditJualKomoditasPage,
    InfoHargaPage,
    ProfilePage,
    ProfilePetaniPage,
    ProfileEditPage,
    TambahAspirasiPage,
    SignupPage,
    SignupPilihanPage,
    LoginPage,
    OperasiPasarPage,
    KirimOperasiPasarPage,
    StatusProduksiPage,
    KirimStatusProduksiPage,
    PendukungPage,
    PopoverPage,
    GantiPasswordPage,
    TambahInfoHargaPage,
    ForgetPasswordPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    TabsMasyarakatPage,
    JualBeliPage,
    AspirasiPage,
    TambahJualKomoditasPage,
    JualKomoditasPage,
    EditJualKomoditasPage,
    InfoHargaPage,
    ProfilePage,
    ProfilePetaniPage,
    ProfileEditPage,
    TambahAspirasiPage,
    SignupPage,
    SignupPilihanPage,
    LoginPage,
    OperasiPasarPage,
    KirimOperasiPasarPage,
    StatusProduksiPage,
    KirimStatusProduksiPage,
    PendukungPage,
    PopoverPage,
    GantiPasswordPage,
    TambahInfoHargaPage,
    ForgetPasswordPage
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  ConferenceData,
  UserData,
  Storage
  ]
})
export class AppModule {}
