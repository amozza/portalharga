import { RestProvider } from './../../../providers/rest';
import { SharedProvider } from './../../../providers/shared';
import { UserData } from './../../../providers/user-data';
import { AuthHttp } from 'angular2-jwt';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ActionSheetController, , LoadingController, Events } from 'ionic-angular';


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
  
  private passedParam       : any;
  private artikel           : any;
  private isSecondary       : boolean =  false;

  constructor(private authHttp: AuthHttp, 
              private loadingCtrl: LoadingController, 
              private rest: RestProvider,
              private shared: SharedProvider,
              private actionSheetCtrl: ActionSheetController, 
              private event: Events,
              public app : App, private userData: UserData,
              public navCtrl: NavController, public navParams: NavParams) {
    // get the params from the caller page
    this.passedParam = navParams.data;
    console.log('data lemparan', this.passedParam);
    //listening for update data
    this.event.subscribe('artikel:view:refresh', ()=>{
      this.getArtikelbyId();
    })
  }

  ionViewDidLoad() {
    this.getArtikelbyId();
    console.log('ionViewDidLoad ArtikelPreviewPage');
  }
/**
 * Req api
 */
  getArtikelbyId(){
    this.rest.get(this.userData.Base_URL_KMS + 'api/artikel/post/'+ this.passedParam._id, this.userData.token)
    .subscribe(response =>{
      console.log('responseny', response)
      this.artikel = response;
      console.log('get artikkel by id', this.artikel)
    }, err =>{
      alert(err)
      console.log('error boy', err)
    });
  }
  deleteArtikel(){
    let claims = JSON.stringify({
      id: this.artikel._id
    })
    let loader = this.loadingCtrl.create({
      content: "Harap tunggu..."
    });
    loader.present();    


    this.rest.delete(this.userData.Base_URL_KMS+'api/artikel/post/hapus', this.userData.token, claims)
    .subscribe(res =>{
      loader.dismiss();
      console.log('balikannya res ', res)
      this.shared.toast.showToast('Berhasil menghapus artikel');
      this.navCtrl.pop();
      this.event.publish('artikel:refresh');
    }, err=>{
      loader.dismiss();
      this.rest.showError(err);
    })
  }

/**
 * page function
 */
  like(){
    console.log('click')
    if(this.isSecondary)
      this.isSecondary = false;
    else this.isSecondary = true;

  }
  pushKomentarPage(){
    this.navCtrl.push('KomentarPage', {type: 'artikel', id: this.artikel._id, typeComment: 'komentar'});
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Hapus',
          role: 'destructive',          
          icon: 'trash',
          handler: () => {
            this.shared.Alert.confirm('Apakah anda yakin')
            .then(res=>{
              this.deleteArtikel();
            }, err=>{
              console.log('ga jadi dah cuy');
            })
          }
        },{
          text: 'Edit',
          icon: 'create',
          handler: () => {
            this.navCtrl.push('ArtikelEditTambahPage', {page: "Edit", data: this.artikel});
            console.log('Destructive clicked');
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
