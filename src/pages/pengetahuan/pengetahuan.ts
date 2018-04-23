import { RestProvider } from './../../providers/rest';
import { MateriPage } from './../penyuluh/materi/materi';
import { ListPetaniPage } from './../penyuluh/list-petani/list-petani';
import { InfoHargaPage } from './../info-harga/info-harga';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Events } from 'ionic-angular';

/**
 * Generated class for the PengetahuanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-pengetahuan',
  providers: [],
  templateUrl: 'pengetahuan.html',
})
export class PengetahuanPage {

  //tabs component
  tab1Root: any = 'ArtikelPage';
  tab2Root: any = 'BerbagiFilePage';
  tab3Root: any = 'ForumPage';
  
  //badge
  tab1Badge: number = 0;
  
  constructor(public navCtrl: NavController,
              public event: Events, 
              public navParams: NavParams) {
    this.event.subscribe('artikel:badge', ()=>{
      this.tab1Badge = 0;
    })
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
