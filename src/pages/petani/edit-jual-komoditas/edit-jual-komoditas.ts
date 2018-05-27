import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { NgForm } from '@angular/forms';
import {Camera} from 'ionic-native';
import { AuthHttp } from 'angular2-jwt';

/*
  Generated class for the EditJualKomoditas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-edit-jual-komoditas',
  templateUrl: 'edit-jual-komoditas.html'
})
export class EditJualKomoditasPage {

  submitted: boolean = false;
  user_id: string;
  dagangan:{dagangan_id?: string,komoditas_id?: string, keterangan?: string, stok?: string, harga?: string, satuan?: string,  picture?: string} = {};
  dataKomoditas = [];
  image: string;
  constructor(
  	public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public authHttp: AuthHttp, 
  	public navParams: NavParams,
    public userData: UserData) {

    let data = navParams.data;
    this.dagangan.komoditas_id = data.komoditas_id;
    this.dagangan.stok = data.stok;
    this.dagangan.harga = data.harga;
    this.image = data.picture;
    this.dagangan.keterangan = data.keterangan;
    this.dagangan.dagangan_id = data.dagangan_id;
  }
  ionViewWillEnter() {
    this.userData.getId().then((value) => {
      this.user_id = value;
    });
    this.userData.getKomoditas().then((value) => {
      this.dataKomoditas = value;
    });
  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
    	this.dagangan.picture =imageData;
    	}, (err) => {
        console.log(err);
    });
  }
  getPhotoFromGallery(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType     : Camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
    	this.dagangan.picture = imageData;
    	}, (err) => {
        console.log(err);
    });
  }

  submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.submitted = false;
      let input = JSON.stringify({
        komoditas_id: this.dagangan.komoditas_id,
        picture: this.dagangan.picture,
        stok: this.dagangan.stok, 
        harga: this.dagangan.harga,
        dagangan_id: this.dagangan.dagangan_id,
        keterangan: this.dagangan.keterangan
      });
      this.authHttp.post(this.userData.BASE_URL+"dagangan/update",input).subscribe(data => {
         let response = data.json();
         if(response.status == 200) {
            this.navCtrl.popToRoot();
            this.showAlert("Komoditas anda telah berhasil diperbarui");
         }
      }, err => {
        this.navCtrl.popToRoot();
        this.showError(err);
      });
    }
  }
  showError(err: any){  
    err.status==0? 
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  showAlert(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
