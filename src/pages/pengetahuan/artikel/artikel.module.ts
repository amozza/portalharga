import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtikelPage } from './artikel';

@NgModule({
  declarations: [
    ArtikelPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ArtikelPage),
  ],
})
export class ArtikelPageModule {}
