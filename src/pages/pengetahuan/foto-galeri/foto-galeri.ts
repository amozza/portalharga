import { UserData } from './../../../providers/user-data';
import { RestProvider } from './../../../providers/rest';
import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import {ModalController} from "ionic-Angular";

/**
 * Generated class for the FotoGaleriPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  providers: [],
  selector: 'page-foto-galeri',
  templateUrl: 'foto-galeri.html',
})
export class FotoGaleriPage {

  public choosedPhoto     : any;
  public token            : string;
  public base_url         : string;
  public foto             : any       = []; //list foto
  public streamLampiran   : string;

  constructor(public view: ViewController,
              public rest: RestProvider,
              public userData: UserData
              
  ) {
    this.base_url = this.userData.Base_URL_KMS;
    this.streamLampiran = 'api/lampiran/file/';    
    this.getUploadedFoto();
  }

  ionViewWillEnter(){
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FotoGaleriPage');
  }

  closeModal(photo){
    this.view.dismiss();
  }
  getUploadedFoto(){
    this.rest.get(this.userData.Base_URL_KMS+this.streamLampiran+'saya/{"skip": 0, "limit": null, "jenis": "gambar"}', this.userData.token)
    .subscribe(
      data =>{
        this.foto = data;
        console.log('berhasil get foto galeri ', this.foto)
      },
      err =>{
        alert(JSON.stringify(err))
      }
    )

  }
  submit(){
    this.view.dismiss(this.choosedPhoto.nama.sistem);
  }

  choosePhoto(foto){
    this.choosedPhoto=foto
    console.log(this.choosedPhoto);
  }  

  
}
