import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { KirimStatusProduksiPage } from '../kirim-status-produksi/kirim-status-produksi';

/*
  Generated class for the StatusProduksi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-status-produksi',
  templateUrl: 'status-produksi.html'
})
export class StatusProduksiPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusProduksiPage');
  }

  tambahProduksi(){
  	this.navCtrl.push(KirimStatusProduksiPage);
  }
}
