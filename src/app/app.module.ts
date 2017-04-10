import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
// Petani
import { TabsPage } from '../pages/petani/tabs-petani/tabs';
import { AspirasiPage } from '../pages/petani/aspirasi/aspirasi';
import { EditAspirasiPage } from '../pages/petani/edit-aspirasi/edit-aspirasi';
import { TambahAspirasiPage } from '../pages/petani/tambah-aspirasi/tambah-aspirasi';
import { KirimStatusProduksiPage } from '../pages/petani/kirim-status-produksi/kirim-status-produksi';
import { PendukungPage } from '../pages/petani/pendukung/pendukung';
import { StatusProduksiPage } from '../pages/petani/status-produksi/status-produksi';
import { EditStatusProduksiPage } from '../pages/petani/edit-status-produksi/edit-status-produksi';
import { ProfilePetaniPage } from '../pages/petani/profile-petani/profile';
import { TambahJualKomoditasPage } from '../pages/petani/tambah-jual-komoditas/tambah-jual-komoditas';
import { JualKomoditasPage } from '../pages/petani/jual-komoditas/jual-komoditas';
import { EditJualKomoditasPage } from '../pages/petani/edit-jual-komoditas/edit-jual-komoditas';
// Masyarakat
import { TabsMasyarakatPage } from '../pages/masyarakat/tabs-masyarakat/tabs-masyarakat';
import { OperasiPasarPage } from '../pages/masyarakat/operasi-pasar/operasi-pasar';
import { EditOperasiPasarPage } from '../pages/masyarakat/edit-operasi-pasar/edit-operasi-pasar';
import { KirimOperasiPasarPage } from '../pages/masyarakat/kirim-operasi-pasar/kirim-operasi-pasar';
import { PendukungOperasiPasarPage } from '../pages/masyarakat/pendukung-operasi-pasar/pendukung-operasi-pasar';
import { JualBeliPage } from '../pages/masyarakat/jual-beli/jual-beli';
import { TambahInfoHargaPage } from '../pages/masyarakat/tambah-info-harga/tambah-info-harga';
import { EditInfoHargaPage } from '../pages/masyarakat/edit-info-harga/edit-info-harga';
import { ProfileMasyarakatPage } from '../pages/masyarakat/profile-masyarakat/profile-masyarakat';
//pedagang
import { TabsPedagangPage } from '../pages/pedagang/tabs-pedagang/tabs-pedagang';
import { ProfilePedagangPage } from '../pages/pedagang/profile-pedagang/profile-pedagang';
//penyuluh
import { TabsPenyuluhPage } from '../pages/penyuluh/tabs-penyuluh/tabs-penyuluh';
import { ListPetaniPage } from '../pages/penyuluh/list-petani/list-petani';
import { TambahPetaniPage } from '../pages/penyuluh/tambah-petani/tambah-petani';
import { ProfilePenyuluhPage } from '../pages/penyuluh/profile-penyuluh/profile-penyuluh';
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

import { Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

let storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    headerPrefix: "",
    noJwtError: true,
    globalHeaders: [{'Content-Type': 'application/json'}],
    tokenGetter: (() => storage.get('token')),
  }), http);
}

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
    EditOperasiPasarPage,
    KirimOperasiPasarPage,
    StatusProduksiPage,
    KirimStatusProduksiPage,
    PendukungPage,
    PopoverPage,
    GantiPasswordPage,
    TambahInfoHargaPage,
    ForgetPasswordPage,
    ProfileMasyarakatPage,
    EditAspirasiPage,
    EditStatusProduksiPage,
    PendukungOperasiPasarPage,
    EditInfoHargaPage,
    TabsPedagangPage,
    ProfilePedagangPage,
    TabsPenyuluhPage,
    ListPetaniPage,
    TambahPetaniPage,
    ProfilePenyuluhPage
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
    EditOperasiPasarPage,
    KirimOperasiPasarPage,
    StatusProduksiPage,
    KirimStatusProduksiPage,
    PendukungPage,
    PopoverPage,
    GantiPasswordPage,
    TambahInfoHargaPage,
    ForgetPasswordPage,
    ProfileMasyarakatPage,
    EditAspirasiPage,
    EditStatusProduksiPage,
    PendukungOperasiPasarPage,
    EditInfoHargaPage,
    TabsPedagangPage,
    ProfilePedagangPage,
    TabsPenyuluhPage,
    ListPetaniPage,
    TambahPetaniPage,
    ProfilePenyuluhPage
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  ConferenceData,
  UserData,
  Storage,
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    }
  ]
})
export class AppModule {}
