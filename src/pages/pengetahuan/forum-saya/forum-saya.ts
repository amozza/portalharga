import { SharedProvider } from './../../../providers/shared';
import { UserData } from './../../../providers/user-data';
import { RestProvider } from './../../../providers/rest';
import { Component, LOCALE_ID } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ForumSayaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forum-saya',
  templateUrl: 'forum-saya.html',
  providers: [{provide: LOCALE_ID, useValue: "id"}]
})
export class ForumSayaPage {

  private forumSaya         : any = [];

  constructor(public navCtrl: NavController,
              public rest: RestProvider,
              public userData: UserData,
              public shared: SharedProvider, 
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumSayaPage');
    this.getForumSaya();
  }

  getForumSaya(){
    let uri = this.userData.Base_URL_KMS+'api/diskusi/tanya/saya/{"skip": 0, "limit": null, "status": null}/{"terbaru": 1}'
    this.rest.get(uri, this.userData.token)
    .subscribe(
      data =>{
        this.forumSaya = data;
        console.log('berhasil get forum saya', this.forumSaya);
      }, err =>{
        alert(JSON.stringify(err));
      }
    )
  }
  pushForumPreviewPage(id){
    this.navCtrl.push('ForumPreviewPage', {idPertanyaan:id});
  }
}
