import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForumRoomPage } from './forum-room';

@NgModule({
  declarations: [
    ForumRoomPage,
  ],
  imports: [
    IonicPageModule.forChild(ForumRoomPage),
  ],
})
export class ForumRoomPageModule {}
