import { RestProvider } from './../../../providers/rest';
import { UserData } from './../../../providers/user-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

/**
 * Generated class for the ForumSubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forum-sub',
  templateUrl: 'forum-sub.html',
})
export class ForumSubPage {
  private idKategori      : string;
  private kategori        : any = [];

  constructor(public navCtrl: NavController,
              public userData: UserData,
              public app: App,
              public rest: RestProvider, 
              public navParams: NavParams) {
    
    this.idKategori = this.navParams.data.idKategori;
    console.log('id kategori yang diterima ', this.idKategori);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumSubPage');
    this.getSubCategory();
  }

/**
 * API
 */
  getSubCategory(){
    let uri = this.userData.Base_URL_KMS+'api/kategorisasi/kategori/'+this.idKategori;

    this.rest.get(uri, this.userData.token)
    .subscribe(
      data =>{
        this.kategori = data;
        console.log('berhasil get sub kategori ', this.kategori)
      }, err =>{
        this.rest.showError(err);
      }
    )
  }

  pushForumRoom(id, nama){
    this.navCtrl.push('ForumRoomPage', {idSubKategori: id, namaSubKategori: nama });
  }
}
