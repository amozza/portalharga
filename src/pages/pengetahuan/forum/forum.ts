import { RestProvider } from './../../../providers/rest';
import { UserData } from './../../../providers/user-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';

/**
 * Generated class for the ForumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html',
})
export class ForumPage {

  private kategoris       : any =[];

  constructor(public navCtrl: NavController,
              public rest: RestProvider,
              public userData: UserData,
              public event: Events,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumPage');
    this.getCategory();
  }
  pushForumSubPage(id){
    this.navCtrl.push('ForumSubPage', {idKategori: id});
    console.log('id kategori yang dikirim ', id);
  }
  pushPageForumSaya(){
    this.navCtrl.push('ForumSayaPage');
  }  

  switch(){
    this.navCtrl.parent.select(0);
    this.event.publish('artikel:badge');
  }

/**
 * API
 */
  getCategory(){
    let uri = this.userData.Base_URL_KMS+'api/kategorisasi/kategori/all/{"skip":0,"limit":null,"subkategori":1}/{"terbaru":1}'
    this.rest.get(uri, this.userData.token)
    .subscribe(
      res =>{
        console.log('berhasil get kategori ', res)
        this.kategoris = res;
      },
      err =>{
        alert('gagal get category')
      }
    )
  }  
      

}
