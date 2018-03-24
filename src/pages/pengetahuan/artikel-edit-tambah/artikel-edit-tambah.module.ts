import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtikelEditTambahPage } from './artikel-edit-tambah';

@NgModule({
  declarations: [
    ArtikelEditTambahPage,
  ],
  imports: [
    IonicPageModule.forChild(ArtikelEditTambahPage),
    ComponentsModule    
  ],
})
export class ArtikelEditTambahPageModule {}
