import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumSubPage } from './forum-sub';

@NgModule({
  declarations: [
    ForumSubPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumSubPage),
  ],
})
export class ForumSubPageModule {}
