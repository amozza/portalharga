import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumTambahPage } from './forum-tambah';

@NgModule({
  declarations: [
    ForumTambahPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumTambahPage),
  ],
})
export class ForumTambahPageModule {}
