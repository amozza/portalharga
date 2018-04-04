import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the ForumPreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forum-preview',
  templateUrl: 'forum-preview.html',
})
export class ForumPreviewPage {

  constructor(public actionSheetCtrl:  ActionSheetController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumPreviewPage');
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
