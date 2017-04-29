import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TambahMateriPage } from '../tambah-materi/tambah-materi';

/*
  Generated class for the Materi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-materi',
  templateUrl: 'materi.html'
})
export class MateriPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MateriPage');
  }

  tambahMateri(){
    this.navCtrl.push(TambahMateriPage);
  }
}
