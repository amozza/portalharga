import { SharedProvider } from './../../../providers/shared';
import { UserData } from './../../../providers/user-data';
import { RestProvider } from './../../../providers/rest';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content, Modal, ModalController } from 'ionic-angular';

/**
 * Generated class for the KomentarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-komentar',
  templateUrl: 'komentar.html',
})
export class KomentarPage {
  @ViewChild(Content) content: Content;

  private type                  : string;
  private id                    : any;
  private data                  : any = []; 
  private typeComment           : string;

  constructor(public navCtrl: NavController,
              public rest: RestProvider,
              public event: Events, 
              public userData: UserData,
              public myModal: ModalController,
              public shared: SharedProvider, 
              public navParams: NavParams) {
    
    // get the params
    this.type = this.navParams.data.type;
    this.id = this.navParams.data.id;
    this.typeComment = this.navParams.data.typeComment;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KomentarPage');
    this.getKomentar();
  }
  getKomentar(){
    let uri = this.userData.Base_URL_KMS+'api/tanggapan/'+this.typeComment+'/'+this.type+'/'+this.id+'/{"skip": 0, "limit": null }';
    this.rest.get(uri, this.userData.token)
    .subscribe( res =>{
      console.log('berhasil get komentar ', res);
      this.data = res;
    }, err =>{
      alert(JSON.stringify(err))
    })
  }

  submitMessage(message){
    console.log('submit output ', message);
    console.log('id artikel ', this.id);
    let claims = JSON.stringify({
      id: this.id,
      isi: message,
      status: 'terbit'
    })
    console.log('claimsnya ', claims);

    this.rest.post(this.userData.Base_URL_KMS+'api/tanggapan/'+this.typeComment+'/'+this.type+'/tulis', this.userData.token, claims)
    .subscribe(
      res =>{
        this.getKomentar();
        this.event.publish('komentar:submit:status', true);
      }, err =>{
        alert(JSON.stringify(err));
      }
    )
  }
/**
 * page function
 */
  openBalasan(idKomentar){
    console.log('output id ', idKomentar);
    const komentarBalasan: Modal = this.myModal.create('KomentarBalasanPage', {id: idKomentar, typeComment: 'balasan'})
    komentarBalasan.present();
  }
  scrollToBottom() {

    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
        console.log('scroll to bottom fired')        
      }
    }, 400)
  }
}
