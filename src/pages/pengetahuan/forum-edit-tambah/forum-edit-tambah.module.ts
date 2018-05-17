import { TagInputModule } from 'ngx-chips';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumEditTambahPage } from './forum-edit-tambah';

// we use component html editor from component module
import { ComponentsModule } from './../../../components/components.module';

@NgModule({
  declarations: [
    ForumEditTambahPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumEditTambahPage),
    ComponentsModule,
    TagInputModule
  ],
})
export class ForumEditTambahPageModule {}
