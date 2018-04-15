import { MateriPage } from './../penyuluh/materi/materi';
import { ListPetaniPage } from './../penyuluh/list-petani/list-petani';
import { InfoHargaPage } from './../info-harga/info-harga';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';

/**
 * Generated class for the PengetahuanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pengetahuan',
  templateUrl: 'pengetahuan.html',
})
export class PengetahuanPage {

  //tabs component
  tab1Root: any = 'ArtikelPage';
  tab2Root: any = 'BerbagiFilePage';
  tab3Root: any = 'ForumPage';  
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewWillEnter(){
    console.log('pengetahuan will enter')
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PengetahuanPage');
  }
  ionViewWillUnload(){
    console.log('will unload page pengetahuan')
  }
  openPage(page) {
    this.navCtrl.setRoot(page.page, page.params);
  }
  

}
