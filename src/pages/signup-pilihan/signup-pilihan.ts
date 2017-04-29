import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { TambahPetaniPage } from '../penyuluh/tambah-petani/tambah-petani';
import { TambahPedagangPage } from '../pedagang/tambah-pedagang/tambah-pedagang';

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

  petani(){
  	this.navCtrl.push(TambahPetaniPage,1);
  }
  masyarakat(){
  	this.navCtrl.push(SignupPage,5);
  }
  pedagang(){
    this.navCtrl.push(TambahPedagangPage);
  }
  penyuluh(){
    this.navCtrl.push(SignupPage,3);
  }
}
