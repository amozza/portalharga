import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KomentarPage } from './komentar';


@NgModule({
  declarations: [
    KomentarPage,
  ],
  imports: [
    IonicPageModule.forChild(KomentarPage),
    ComponentsModule
  ],
})
export class KomentarPageModule {}
