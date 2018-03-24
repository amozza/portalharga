import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ActionSheetController,  } from 'ionic-angular';

/**
 * Generated class for the ArtikelPreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artikel-preview',
  templateUrl: 'artikel-preview.html',
})
export class ArtikelPreviewPage {
  isSecondary: boolean =  false;
  constructor(private actionSheetCtrl: ActionSheetController, public app : App, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtikelPreviewPage');
  }
  like(){
    console.log('click')
    if(this.isSecondary)
      this.isSecondary = false;
    else this.isSecondary = true;

  }
  pushKomentarPage(){
    this.app.getRootNav().push('KomentarPage');
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Hapus',
          role: 'destructive',          
          icon: 'trash',
          handler: () => {
            // this.showConfirm();
            console.log('Hapus clicked');
          }
        },{
          text: 'Edit',
          icon: 'create',
          handler: () => {
            // this.app.getRootNav().push('ArtikelPreviewPage')
            this.navCtrl.pop;
            console.log('Destructive clicked');
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
