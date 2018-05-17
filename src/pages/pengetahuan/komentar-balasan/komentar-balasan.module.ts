import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KomentarBalasanPage } from './komentar-balasan';

@NgModule({
  declarations: [
    KomentarBalasanPage,
  ],
  imports: [
    IonicPageModule.forChild(KomentarBalasanPage),
    ComponentsModule    
  ],
})
export class KomentarBalasanPageModule {}
