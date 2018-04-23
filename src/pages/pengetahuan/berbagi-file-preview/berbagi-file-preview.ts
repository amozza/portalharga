import { SharedProvider } from './../../../providers/shared';
import { UserData } from './../../../providers/user-data';
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

  private passedParam: any;

  constructor(public app: App, 
              public shared: SharedProvider,
              public actionSheetCtrl: ActionSheetController,
              public userData: UserData, 
              public navCtrl: NavController, 
              public navParams: NavParams) {
    // get the params from the caller page
    this.passedParam = navParams.data;
    console.log('lemparan datanya ', this.passedParam)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerbagiFilePreviewPage');
  }

/**
 * req api
 */
  UnduhFile(){
    window.open(this.userData.Base_URL_KMS+'api/materi/file/'+this.passedParam.nama.sistem);
  }
  deleteFile(){
    alert('req to delete fire')
  }
/**
 * page function
 */
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
            this.shared.Alert.confirm('Apakah anda yakin ?')
            .then(res=>{
              this.deleteFile();
            },err =>{
              console.log('ga jadi ah')
            })
          }
        },{
          text: 'Edit',
          icon: 'create',
          handler: () => {
            this.navCtrl.push('BerbagiFileEditTambahPage', {page:"Edit", data: this.passedParam});
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
