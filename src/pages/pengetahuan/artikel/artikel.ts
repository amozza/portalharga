import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, App } from 'ionic-angular';

/**
 * Generated class for the ArtikelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artikel',
  templateUrl: 'artikel.html',
})
export class ArtikelPage {

  @ViewChild(Content) content:Content;

  private segment: String='saya';

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtikelPage');
  }
  selectedSegment(value){
    console.log('segment yang dipilih ', value)
  }
  scrollToTop(){
    // this.content.scrollToTop();
    console.log('is scroll end', this.content.ionScrollEnd)
  }
  scrollPosition(ev){
    console.log('scroll position')

  }
  pushArtikelTambahPage(){
    console.log('goes to tambah artikel')
    this.app.getRootNav().push('ArtikelEditTambahPage',{page:'Tambah'});
  }  

}
