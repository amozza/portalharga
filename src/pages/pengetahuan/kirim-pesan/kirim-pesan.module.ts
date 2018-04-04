import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KirimPesanPage } from './kirim-pesan';

@NgModule({
  declarations: [
    KirimPesanPage,
  ],
  imports: [
    IonicPageModule.forChild(KirimPesanPage),
  ],
})
export class KirimPesanPageModule {}
