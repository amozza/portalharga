import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Pendukung page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pendukung',
  templateUrl: 'pendukung.html'
})
export class PendukungPage {
  public id: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.id = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendukungPage');
    console.log(this.id);
  }

}
