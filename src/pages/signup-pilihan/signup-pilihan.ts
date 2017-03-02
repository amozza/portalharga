import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';

/*
  Generated class for the SignupPilihan page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup-pilihan',
  templateUrl: 'signup-pilihan.html'
})
export class SignupPilihanPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPilihanPage');
  }
  petani(){
  	this.navCtrl.push(SignupPage,1);
  }
  masyarakat(){
  	this.navCtrl.push(SignupPage,2);
  }
}
