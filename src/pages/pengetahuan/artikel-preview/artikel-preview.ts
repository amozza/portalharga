import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the ArtikelPreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artikel-preview',
  templateUrl: 'artikel-preview.html',
})
export class ArtikelPreviewPage {
  isSecondary: boolean =  false;
  constructor(public app : App, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtikelPreviewPage');
  }
  like(){
    console.log('click')
    if(this.isSecondary)
      this.isSecondary = false;
    else this.isSecondary = true;

  }
  pushKomentarPage(){
    this.app.getRootNav().push('KomentarPage');
  }
}
