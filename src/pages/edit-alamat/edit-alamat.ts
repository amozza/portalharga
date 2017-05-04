import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Http,Headers,RequestOptions } from '@angular/http';
import { NgForm } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
/*
  Generated class for the EditAlamat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-alamat',
  templateUrl: 'edit-alamat.html'
})
export class EditAlamatPage {
  submitted = false;
  address:string;
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
  inputAlamat: string;
  headers = new Headers({ 
                'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userData: UserData,
    public http: Http,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public authHttp: AuthHttp) {}

  ionViewWillEnter() {
    this.userData.getAddress().then((value)=>{
      this.address = value;
    });
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

   onUpdate(form: NgForm) {
    this.submitted = true;
    let loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });
    console.log(form.valid);
    if (form.valid) {
    	loading.present();
      let address = this.inputAlamat+" "+this.namaKelurahan+" "+this.namaKecamatan+" "+this.namaKabupaten+" "+this.namaProvinsi;
      let param = JSON.stringify({
     	  address : address,
      });
      this.authHttp.post(this.userData.BASE_URL+'user/updateAddress',param).subscribe(res => {
      	loading.dismiss();
        let response = res.json();
        if(response.status == 200) {
          this.userData.setAddress(address);
          this.showAlert("Berhasil memperbarui alamat");
          this.navCtrl.popToRoot();
        } else if(response.status == 400) {
          this.showAlert(response.message);
        }
      }, err => { 
      	loading.dismiss();
         this.showError(err);
      });

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
