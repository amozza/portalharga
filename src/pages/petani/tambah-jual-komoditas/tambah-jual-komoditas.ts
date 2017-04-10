import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { NgForm } from '@angular/forms';
import {Camera} from 'ionic-native';
import { AuthHttp } from 'angular2-jwt';

/*
  Generated class for the TambahJualKomoditas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tambah-jual-komoditas',
  templateUrl: 'tambah-jual-komoditas.html'
})
export class TambahJualKomoditasPage {
  submitted: boolean = false;
  user_id: string;
  dagangan:{komoditas_id?: string, stok?: string, keterangan?: string, harga?: string, picture?: string, satuan?: string} = {};
  selectedKomoditas:string;
  dataKomoditas = [];
  constructor(
  	public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public authHttp: AuthHttp, 
  	public navParams: NavParams,
    public userData: UserData) {
  }
  ionViewWillEnter() {
    this.userData.getKomoditas().then((value) => {
      this.dataKomoditas = value;
    });
    this.userData.getId().then((value) => {
      this.user_id = value;
    });
  }
  
  changeKomoditas(idKomoditas){
     this.dagangan.komoditas_id = idKomoditas;
     for(let data of this.dataKomoditas){
       if(data.komoditas_id == idKomoditas) {
         this.dagangan.satuan = data.satuan;
         break;
       }
     }
  }
  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
    	this.dagangan.picture = imageData;
    	}, (err) => {
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
        keterangan: this.dagangan.keterangan,
        harga: this.dagangan.harga
      });
      this.authHttp.post(this.userData.BASE_URL+"dagangan/add",input).subscribe(data => {
         let response = data.json();
         if(response.status == 200) {
            this.navCtrl.popToRoot();
            this.showAlert("Komoditas berhasil dikirim");
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
