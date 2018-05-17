import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FileKeepPage } from './file-keep';

@NgModule({
  declarations: [
    FileKeepPage,
  ],
  imports: [
    IonicPageModule.forChild(FileKeepPage),
  ],
})
export class FileKeepPageModule {}
