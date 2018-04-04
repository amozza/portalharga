import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';


/**
 * Generated class for the BerbagiFilePublisherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-berbagi-file-publisher',
  templateUrl: 'berbagi-file-publisher.html',
})
export class BerbagiFilePublisherPage {

  private segment = 'explore';
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerbagiFilePublisherPage');
  }
  selectedSegment(value){
    console.log('segment yang dipilih ', value)
  }  
  presentProfileModal() {
    let profileModal = this.modalCtrl.create('KirimPesanPage', { userId: 8675309 });
    profileModal.present();
  }
}
