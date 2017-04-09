import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation} from 'ionic-native';
import { AuthHttp } from 'angular2-jwt';
import { UserData } from '../../../providers/user-data';
import { NgForm } from '@angular/forms';

/*
  Generated class for the TambahInfoHarga page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google: any;
@Component({
  selector: 'page-tambah-info-harga',
  templateUrl: 'tambah-info-harga.html'
})
export class TambahInfoHargaPage {
  submitted = false;
  infoHarga:{komoditas?: string, harga?: number, satuan?: string} = {};
  lokasi:{lat?: number, lng?: number}={};
  dataKomoditas=[];
  id: string;
  alamat: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public userData: UserData,
  	public authHttp: AuthHttp,
  	public toastCtrl: ToastController
  	) { }

  ionViewWillEnter() {
    this.getCurrentLocation();
    this.userData.getId().then((value) => {
      this.id = value;
    });
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
  getAddress(){
    let geocoder = new google.maps.Geocoder();
    let latlng = {lat: this.lokasi.lat, lng: this.lokasi.lng};
    geocoder.geocode({'location': latlng},(results, status)=> {
      if(status=='OK') {
        this.alamat = results[0].formatted_address;
      } else{
        this.showAlert("Tidak dapat menemukan alamat Anda");
      }
    });
  }
  getCurrentLocation(){
    Geolocation.getCurrentPosition().then((position) => {
      this.lokasi.lng = position.coords.longitude;
      this.lokasi.lat = position.coords.latitude;
      this.getAddress();
    }, (err) => {
      console.log(err);
    });
  }
  submit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.submitted = false;
      let input = JSON.stringify({
        komoditas_id: this.infoHarga.komoditas,
        harga: this.infoHarga.harga,
        latitude: this.lokasi.lat,
        longitude: this.lokasi.lng, 
        alamat: this.alamat
      });
      console.log(input);
      this.authHttp.post(this.userData.BASE_URL+"infoHarga/add",input).subscribe(data => {
         let response = data.json();
         console.log(response);
         if(response.status == 200) {
            this.navCtrl.popToRoot();
            this.showAlert("Terima kasih telah mengirim info harga");
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
