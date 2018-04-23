import { RestProvider } from './../../../providers/rest';
import { SharedProvider } from './../../../providers/shared';
import { UserData } from './../../../providers/user-data';
import { AuthHttp } from 'angular2-jwt';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ActionSheetController, , LoadingController } from 'ionic-angular';


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
  
  passedParam: any;
  artikel: any;
  isSecondary: boolean =  false;

  constructor(private authHttp: AuthHttp, 
              private loadingCtrl: LoadingController, 
              private rest: RestProvider,
              private shared: SharedProvider,
              private actionSheetCtrl: ActionSheetController, 
              public app : App, private userData: UserData,
              public navCtrl: NavController, public navParams: NavParams) {
    // get the params from the caller page
    this.passedParam = navParams.data;
    console.log('data lemparan', this.passedParam);
  }

  ionViewDidLoad() {
    this.getArtikelbyId();
    console.log('ionViewDidLoad ArtikelPreviewPage');
  }
/**
 * Req api
 */
  getArtikelbyId(){
    this.authHttp.get(this.userData.Base_URL_KMS + 'api/artikel/post/'+ this.passedParam._id)
    .subscribe(response =>{
      this.artikel = response.json().data;
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


    this.rest.post(this.userData.Base_URL_KMS+'api/artikel/post/hapus', this.userData.token, claims)
    .subscribe(res =>{
      loader.dismiss();
      console.log('balikannya 200', res)
      console.log('akses status body ', JSON.parse(JSON.stringify(res)).status)
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
    this.navCtrl.push('KomentarPage', {type: 'artikel'});
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
            console.log('Hapus clicked');
          }
        },{
          text: 'Edit',
          icon: 'create',
          handler: () => {
            // this.app.getRootNav().push('ArtikelPreviewPage')
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
