import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FotoGaleriPage } from './foto-galeri';

@NgModule({
  declarations: [
    FotoGaleriPage,
  ],
  imports: [
    IonicPageModule.forChild(FotoGaleriPage),
  ],
})
export class FotoGaleriPageModule {}
