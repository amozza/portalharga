import { TagInputModule } from 'ngx-chips';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerbagiFileEditTambahPage } from './berbagi-file-edit-tambah';



@NgModule({
  declarations: [
    BerbagiFileEditTambahPage,
  ],
  imports: [
    IonicPageModule.forChild(BerbagiFileEditTambahPage),
    TagInputModule
  ],
})
export class BerbagiFileEditTambahPageModule {}
