import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumPreviewPage } from './forum-preview';

@NgModule({
  declarations: [
    ForumPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumPreviewPage),
  ],
})
export class ForumPreviewPageModule {}
