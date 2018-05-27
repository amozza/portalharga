import { PendukungPage } from './pendukung';
import { AspirasiPage } from './aspirasi';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
      PendukungPage
    ],
  imports: [
    IonicPageModule.forChild(PendukungPage),
  ],
})
export class PendukungPageModule {}
