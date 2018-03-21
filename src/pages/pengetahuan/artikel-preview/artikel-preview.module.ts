import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArtikelPreviewPage } from './artikel-preview';

@NgModule({
  declarations: [
    ArtikelPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ArtikelPreviewPage),
  ],
})
export class ArtikelPreviewPageModule {}
