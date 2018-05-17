import { SharedProvider } from './../../../providers/shared';
import { UserData } from './../../../providers/user-data';
import { RestProvider } from './../../../providers/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, Events, App } from 'ionic-angular';

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
  private idPertanyaan          : any;
  private pertanyaan            : any;

  constructor(public actionSheetCtrl:  ActionSheetController, 
              public shared: SharedProvider,
              public navCtrl: NavController, 
              public event: Events,
              public app: App,
              public rest: RestProvider,
              public loadingCtrl: LoadingController,
              public userData: UserData,
              public navParams: NavParams) {

    console.log('nnavigasi control ', this.navCtrl);
    this.idPertanyaan = this.navParams.data.idPertanyaan;
    console.log('paramater id pertanyaan yang diterima ', this.idPertanyaan);
    this.event.subscribe('forum:preview:refresh', ()=>{
      this.getPertanyaan();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumPreviewPage');
    this.getPertanyaan();
  }
  deletePertanyaan(){
    let claims = JSON.stringify({
      id: this.pertanyaan._id
    })
    let loader = this.loadingCtrl.create({
      content: "Harap tunggu..."
    });
    loader.present();    

    let uri = this.userData.Base_URL_KMS+'api/diskusi/tanya/hapus';
    this.rest.delete(uri, this.userData.token, claims)
    .subscribe(res =>{
      loader.dismiss();
      console.log('balikannya res ', res)
      this.shared.toast.showToast('Berhasil menghapus artikel');
      this.navCtrl.pop();
      this.event.publish('forum:refresh');
    }, err=>{
      loader.dismiss();
      this.rest.showError(err);
    })
  }  

/**
 * page function
 */
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Hapus',
          role: 'destructive',          
          icon: 'trash',
          handler: () => {
            this.shared.Alert.confirm('Apakah anda yakin ?')
            .then(res =>{
              let uri = this.userData.Base_URL_KMS+'api/diskusi/tanya/hapus';
              this.deletePertanyaan();
            }, err=>{
              alert('error coy')

            })
          }
        },{
          text: 'Edit',
          icon: 'create',
          handler: () => {
            console.log('Edit Clicked');
            this.pushForumTambahPage();
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

  getPertanyaan(){
    let uri = this.userData.Base_URL_KMS+'api/diskusi/tanya/'+this.idPertanyaan;
    this.rest.get(uri, this.userData.token)
    .subscribe(
      data =>{
        this.pertanyaan = data;
        console.log('berhasil get pertanyaaan ', this.pertanyaan)
      }, err =>{
        alert(JSON.stringify(err))
      }
    )
  }
  pushKomentarPage(){
    this.navCtrl.push('KomentarPage', {type: 'diskusi', id: this.idPertanyaan, typeComment: 'komentar'});
  }
  pushForumTambahPage(){
    this.app.getRootNav(). push('ForumEditTambahPage', {pageType: 'Edit', idSubKategori: this.pertanyaan.subkategori._id, data: this.pertanyaan});
  }  
}
