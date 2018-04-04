import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BerbagiFilePublisherPage } from './berbagi-file-publisher';

@NgModule({
  declarations: [
    BerbagiFilePublisherPage,
  ],
  imports: [
    IonicPageModule.forChild(BerbagiFilePublisherPage),
    ComponentsModule    
  ],
})
export class BerbagiFilePublisherPageModule {}
