import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the ForumRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forum-room',
  templateUrl: 'forum-room.html',
})
export class ForumRoomPage {
  gender:string;
  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams) {

  }
  ionViewWillEnter(){
    console.log('will enter forum room')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumRoomPage');
  }

  pushForumPreviewPage(){
    this.app.getRootNav().push('ForumPreviewPage');
  }  
  pushForumTambahPage(){
    this.app.getRootNav().push('ForumTambahPage');
  }
}
