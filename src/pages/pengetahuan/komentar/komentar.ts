import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the KomentarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-komentar',
  templateUrl: 'komentar.html',
})
export class KomentarPage {

  private komentarType      : string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    this.komentarType = this.navParams.data.type;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KomentarPage');
  }
  getKomentarType(){
    console.log('haha')
  }  

}
