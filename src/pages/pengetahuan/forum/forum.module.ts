import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumPage } from './forum';

@NgModule({
  declarations: [
    ForumPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ForumPage),
  ],
})
export class ForumPageModule {}
