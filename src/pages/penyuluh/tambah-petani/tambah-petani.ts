import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, ToastController, NavParams, LoadingController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../../providers/user-data';
import { VerifikasiAkunPage } from '../../verifikasi-akun/verifikasi-akun';

declare var google: any;
/*
  Generated class for the TambahPetani page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tambah-petani',
  templateUrl: 'tambah-petani.html'
})
export class TambahPetaniPage {
  user: {username?: string, name?: string, email?: string, password?: string, nomor_telepon?: string, role?: any} = {};
  submitted = false;
  lokasi:{lat?: number, lng?: number, alamat?: string}={};
  inputAlamat: string;
  dataKomoditas = [];
  provinsi: any;
  kabupaten: any;
  kecamatan: any;
  kelurahan: any;
  pilihProvinsi:string;
  pilihKabupaten: string;
  pilihKecamatan: string;
  pilihKelurahan: string;
  namaProvinsi:string;
  namaKabupaten: string;
  namaKecamatan: string;
  namaKelurahan: string;
  type: number;
  loading: any;
  headers = new Headers({ 
                'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});

  constructor(public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public http: Http,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public userData: UserData) {this.type = this.navParams.data}
  ionViewWillEnter() {
    this.user.role = 4;
    this.getProvinsi();
  }

  // Get Location API
  getProvinsi(){
    this.http.get(this.userData.BASE_URL+"lokasi/provinsi",this.options).subscribe(data => {
	       let response = data.json();
	       if(response.status==200) {
           this.provinsi = response.data;
	       }
	    }, err => { 
	       this.showError(err);
	    });
  }
  changeProvinsi(prov){
    this.kabupaten = null;
    this.kecamatan = null;
    this.kelurahan = null;
    this.getKabupaten(prov);
    for(let data of this.provinsi){
      if(data.id_prov == prov) {
        this.namaProvinsi = data.nama;
        break;
      }
    }
  }
  getKabupaten(idProvinsi){
    this.http.get(this.userData.BASE_URL+"lokasi/kabupaten/"+idProvinsi,this.options).subscribe(data => {
	       let response = data.json();
	       if(response.status==200) {
           this.kabupaten = response.data;
	       }
	    }, err => { 
	       this.showError(err);
	    });
  }
  changeKabupaten(kab){
    this.kecamatan = null;
    this.kelurahan = null;
    this.getKecamatan(kab);
    for(let data of this.kabupaten){
      if(data.id_kab == kab) {
        this.namaKabupaten = data.nama;
        break;
      }
    }
  }
  getKecamatan(idKabupaten){
    this.http.get(this.userData.BASE_URL+"lokasi/kecamatan/"+idKabupaten,this.options).subscribe(data => {
	       let response = data.json();
	       if(response.status==200) {
           this.kecamatan = response.data;
	       }
	    }, err => { 
	       this.showError(err);
	    });
  }
  changeKecamatan(kec){
    this.kelurahan = null;
    this.getKelurahan(kec);
    for(let data of this.kecamatan){
      if(data.id_kec == kec) {
        this.namaKecamatan = data.nama;
        break;
      }
    }
  }
  getKelurahan(idKecamatan){
    this.http.get(this.userData.BASE_URL+"lokasi/kelurahan/"+idKecamatan,this.options).subscribe(data => {
	       let response = data.json();
	       if(response.status==200) {
           this.kelurahan = response.data;
	       }
	    }, err => { 
	       this.showError(err);
	    });
  }
  changeKelurahan(kel){
    for(let data of this.kelurahan){
      if(data.id_kel == kel) {
        this.namaKelurahan = data.nama;
        break;
      }
    }
  }
// End of get location

  postUser(){
  	let input = JSON.stringify({
        username: this.user.username.toLowerCase(), 
        name: this.user.name, 
        email: this.user.email, 
        password: this.user.password, 
        role: this.user.role,
        nomor_telepon: this.user.nomor_telepon,
        address: this.lokasi.alamat,
        login_type : 1
      });
	  this.http.post(this.userData.BASE_URL+"user/add",input,this.options).subscribe(data => {
	       this.loading.dismiss();
	       let response = data.json();
	       if(response.status==200) {
           if(this.type == 1){ // Signup from user
              this.navCtrl.setRoot(VerifikasiAkunPage,response.data);
           } else if(this.type == 2){ //Signup from penyuluh
              this.navCtrl.popToRoot();
           }

	       }
	       this.showAlert(response.message);
	    }, err => { 
	       this.loading.dismiss();
	       this.showError(err);
	    });
  }
  onSignup(form: NgForm) {
    this.submitted = true;
    this.loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });

    if (form.valid) {
      this.loading.present();
      this.lokasi.alamat = this.inputAlamat+" "+this.namaKelurahan+" "+this.namaKecamatan+" "+this.namaKabupaten+" "+this.namaProvinsi;
      this.postUser();
    }
  }
  showError(err: any){  
    err.status==0? 
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  showAlert(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
