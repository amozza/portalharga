import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, App } from 'ionic-angular';

/**
 * Generated class for the BerbagiFilePreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-berbagi-file-preview',
  templateUrl: 'berbagi-file-preview.html',
})
export class BerbagiFilePreviewPage {

  constructor(public app: App, public actionSheetCtrl: ActionSheetController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerbagiFilePreviewPage');
  }
  pushBerbagiFilePublisher(){
    this.navCtrl.push('BerbagiFilePublisherPage');

    console.log('push to berbagi file page');
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Hapus',
          role: 'destructive',          
          icon: 'trash',
          handler: () => {
            console.log('Hapus clicked');
          }
        },{
          text: 'Edit',
          icon: 'create',
          handler: () => {
            console.log('Edit Clicked');
          }
        },{
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }    
}
