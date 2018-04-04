import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtikelEditTambahPage } from './artikel-edit-tambah';
import { TagInputModule } from 'ngx-chips';
import 'rxjs/add/operator/filter';

// we use component html editor from component module
import { ComponentsModule } from './../../../components/components.module';


@NgModule({
  declarations: [
    ArtikelEditTambahPage,
  ],
  imports: [
    IonicPageModule.forChild(ArtikelEditTambahPage),
    ComponentsModule,
    TagInputModule   
  ],
})
export class ArtikelEditTambahPageModule {}
