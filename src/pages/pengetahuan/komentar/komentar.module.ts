import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KomentarPage } from './komentar';

@NgModule({
  declarations: [
    KomentarPage,
  ],
  imports: [
    IonicPageModule.forChild(KomentarPage),
  ],
})
export class KomentarPageModule {}
