import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
/*
  Generated class for the ViewMateri page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-view-materi',
  templateUrl: 'view-materi.html'
})
export class ViewMateriPage {
  judul: string;
  keterangan: string;
  datePost: string;
  nama: string;
  url: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
      let data = this.navParams.data;
      this.judul = data.judul;
      this.datePost = data.datePost;
      this.keterangan = data.keterangan;
      this.nama = data.name;
      this.url = data.file;
  }

  unduhMateri(){
    window.open(this.url);
  }
}
