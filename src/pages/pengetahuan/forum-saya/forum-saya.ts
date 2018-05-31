import { SharedProvider } from './../../../providers/shared';
import { UserData } from './../../../providers/user-data';
import { RestProvider } from './../../../providers/rest';
import { Component, LOCALE_ID } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

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
  private forumSayaTemp     : any = [];

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
    let uri = this.userData.Base_URL_KMS+'api/diskusi/tanya/saya/{"skip": 0, "limit": null, "status": "terbit"}/{"terbaru": 1}'
    this.rest.get(uri, this.userData.token)
    .subscribe(
      data =>{
        this.forumSaya = data;
        this.forumSayaTemp = data;
      }, err =>{
        this.rest.showError(err)
      }
    )
  }
  pushForumPreviewPage(id){
    this.navCtrl.push('ForumPreviewPage', {idPertanyaan:id});
  }

/**
 * page function
 */
  onSearchInput(ev){
    let val = ev.target.value;

    //check if string ''
    if(val && val.trim() != ''){
      this.forumSayaTemp = this.forumSaya.filter((item)=>{
        return (item.judul.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else
      this.forumSayaTemp = this.forumSaya;
  }

  doRefresh(refresher) {
    setTimeout(() => {
      console.log('Async operation has ended');
      this.getForumSaya();
      refresher.complete();
    }, 1000);
  }    
}
