import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

/*
  Generated class for the SignupPilihan page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
  defaultHistory: ['LoginPage']
})
@Component({
  selector: 'page-signup-pilihan',
  templateUrl: 'signup-pilihan.html'
})
export class SignupPilihanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  petani(){
  	this.navCtrl.push('TambahPetaniPage',1);
  }
  masyarakat(){
  	this.navCtrl.push('SignupPage',5);
  }
  pedagang(){
    this.navCtrl.push('TambahPedagangPage');
  }
  penyuluh(){
    this.navCtrl.push('SignupPage',3);
  }
}
