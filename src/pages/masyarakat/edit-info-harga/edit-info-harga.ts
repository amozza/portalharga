import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';
import { UserData } from '../../../providers/user-data';
import { NgForm } from '@angular/forms';
/*
  Generated class for the EditInfoHarga page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-edit-info-harga',
  templateUrl: 'edit-info-harga.html'
})
export class EditInfoHargaPage {
  submitted = false;
  infoHarga:{id?: string, komoditas?: string, harga?: number, satuan?: string} = {};
  dataKomoditas=[];

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public userData: UserData,
  	public authHttp: AuthHttp,
  	public toastCtrl: ToastController
  	) {
  	let data = navParams.data;
  	this.infoHarga.id = data.laporanHarga_id;
  	this.infoHarga.komoditas = data.komoditas_id;
  	this.infoHarga.harga = data.harga;
  	this.changeKomoditas(this.infoHarga.komoditas);
  }
  ionViewWillEnter() {
    this.userData.getKomoditas().then((value) => {
      this.dataKomoditas = value;
    });
  }
  changeKomoditas(idKomoditas){
     for(let data of this.dataKomoditas){
       if(data.komoditas_id == idKomoditas) {
         this.infoHarga.satuan = 'per '+data.satuan;
         break;
       }
     }
  }
  submit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.submitted = false;
      let input = JSON.stringify({
      	laporanHarga_id: this.infoHarga.id,
        komoditas_id: this.infoHarga.komoditas,
        harga: this.infoHarga.harga
      });
      console.log(input);
      this.authHttp.post(this.userData.BASE_URL+"laporanHarga/update",input).subscribe(data => {
         let response = data.json();
         console.log(response);
         if(response.status == 200) {
            this.navCtrl.popToRoot();
            this.showAlert("Laporan harga komoditas anda telah diperbarui");
         }
      }, err => {
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
