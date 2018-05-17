import { UserData } from './../../../providers/user-data';
import { RestProvider } from './../../../providers/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';


/**
 * Generated class for the KomentarBalasanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-komentar-balasan',
  templateUrl: 'komentar-balasan.html',
})
export class KomentarBalasanPage {

  private typeComment           : string;
  private idKomentar            : string;
  private data                  : any = [];

  constructor(public navCtrl: NavController,
              public rest: RestProvider,
              public userdata: UserData,
              public event: Events,
              public view: ViewController,
              public navParams: NavParams) {

    console.log('page balasan dengan navparams ', this.navParams.data)
    this.typeComment = this.navParams.data.typeComment;
    this.idKomentar = this.navParams.data.id;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KomentarBalasanPage');
    this.getBalasan();
  }

  getBalasan(){
    let url = this.userdata.Base_URL_KMS+'api/tanggapan/balasan/'+this.idKomentar+'/{"skip": 0, "limit":null}';
    this.rest.get(url, this.userdata.token)
    .subscribe( data =>{
      console.log('berhasil get balasan komentar ',data );
      this.data = data;
    }, err =>{
      alert(JSON.stringify(err))
    })
  }
  submitMessage(message){
    console.log('output message ', message);

    let claims = JSON.stringify({
      id_komentar: this.idKomentar,
      isi: message,
      status: 'terbit'
    })

    let url = this.userdata.Base_URL_KMS+'api/tanggapan/balasan/tulis';
    
    this.rest.post(url, this.userdata.token, claims)
    .subscribe( res =>{
      this.getBalasan();
      this.event.publish('komentar:submit:status', true);      
    }, err =>{
      alert(JSON.stringify(err));
    })
  }

  /**
   * page funciton
   */
  closeModal(photo){
    this.view.dismiss();
  }  
}
