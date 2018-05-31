import { UserData } from './../../../providers/user-data';
import { RestProvider } from './../../../providers/rest';
import { Component, LOCALE_ID } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';

/**
 * Generated class for the ForumRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forum-room',
  templateUrl: 'forum-room.html',
  providers: [{provide: LOCALE_ID, useValue: "id"}]  
})
export class ForumRoomPage {
  private namaSubKategori     : string;
  private gender              : string;
  private pertanyaans         : any = [];
  private idSubKategori       : any;

  constructor(public app: App, 
              public event: Events,
              public rest: RestProvider,
              public userData: UserData,
              public navCtrl: NavController, 
              public navParams: NavParams) {

    this.idSubKategori = this.navParams.data.idSubKategori;
    this.namaSubKategori = this.navParams.data.namaSubKategori;
    console.log('id sub kategori yang diterim ', this.idSubKategori);
    console.log('nama subkategori ', this.namaSubKategori)

    //event listener
    this.event.subscribe('forum:refresh', ()=>{
      this.getPertanyaans();
    });
    
  }
  ionViewWillEnter(){
    console.log('will enter forum room')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumRoomPage');
    this.getPertanyaans();
  }

/**
 * API
 */
  getPertanyaans(){
    let options = JSON.stringify({"skip": 0, "limit": null, "subkategori": this.idSubKategori});
    let sort = JSON.stringify({"terbaru": 1});
    let uri = this.userData.Base_URL_KMS+'api/diskusi/tanya/all/'+options+'/'+sort;

    this.rest.get(uri, this.userData.token)
    .subscribe(
      data =>{
        this.pertanyaans = data;
        console.log('berhasil get pertanyaans ', this.pertanyaans);
      }, err =>{
        this.rest.showError(err)
      }
    )
  }

/**
 * page funciton
 */
  pushForumPreviewPage(id){
    this.navCtrl.push('ForumPreviewPage', {idPertanyaan: id});
  }  
  pushForumTambahPage(){
    this.app.getRootNav(). push('ForumEditTambahPage', {pageType: 'Tambah', idSubKategori: this.idSubKategori});
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getPertanyaans();
      refresher.complete();
    }, 1000);
  }  
}
