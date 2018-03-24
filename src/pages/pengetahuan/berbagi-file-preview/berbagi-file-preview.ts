import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BerbagiFilePreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-berbagi-file-preview',
  templateUrl: 'berbagi-file-preview.html',
})
export class BerbagiFilePreviewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerbagiFilePreviewPage');
  }
  pushBerbagiFIleProfile(){
    console.log('push to berbagi file page');
  }
}
