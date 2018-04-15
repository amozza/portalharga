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
  public base_url         : string;
  public foto             : any       = [];
  public streamGambar     : string    = 'api/artikel/gambar/';

  constructor(public view: ViewController,
              public rest: RestProvider,
              public userData: UserData
              
  ) {
  }

  ionViewWillEnter(){
    this.base_url = this.userData.Base_URL_KMS;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FotoGaleriPage');
    this.getUploadedFoto();
  }

  closeModal(photo){
    this.view.dismiss();
  }
  getUploadedFoto(){
    this.rest.get(this.userData.Base_URL_KMS+'api/artikel/gambar/saya/{"skip": 0, "limit": null}/{"terbaru": -1}')
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
