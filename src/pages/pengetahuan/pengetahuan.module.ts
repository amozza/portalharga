import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PengetahuanPage } from './pengetahuan';
//import page
import { MateriPage } from './../penyuluh/materi/materi';
import { ListPetaniPage } from './../penyuluh/list-petani/list-petani';
import { InfoHargaPage } from './../info-harga/info-harga';



@NgModule({
  declarations: [
    PengetahuanPage,
  ],
  imports: [
    IonicPageModule.forChild(PengetahuanPage),
  ],
  providers: []
})
export class PengetahuanPageModule {}
