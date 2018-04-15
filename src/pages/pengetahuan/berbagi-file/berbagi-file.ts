import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the BerbagiFilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-berbagi-file',
  templateUrl: 'berbagi-file.html',
})
export class BerbagiFilePage {

  private segment: String='explore';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
  }

  ionViewWillEnter(){
    console.log('masuk ke berbagi file')
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BerbagiFilePage');
  }
  selectedSegment(value){
    console.log('segment yang dipilih ', value)
  }  
  addFile(){
    this.navCtrl.push('BerbagiFileEditTambahPage');
  }
  pushToPublisher(){
    this.navCtrl.push('BerbagiFilePublisherPage');
  }  

}
