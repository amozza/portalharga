import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the ForumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html',
})
export class ForumPage {

  constructor(public navCtrl: NavController,
              // public app: App, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumPage');
  }
  pushForumRoomPage(){
    this.navCtrl.push('ForumRoomPage');
  }

}
