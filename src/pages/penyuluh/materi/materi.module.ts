import { MateriPage } from './materi';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';


@NgModule({
  declarations: [
      MateriPage
    ],
  imports: [
    IonicPageModule.forChild(MateriPage),
  ],
})
export class MateriPageModule {}
