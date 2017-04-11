import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, ToastController, NavParams, LoadingController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../../providers/user-data';
import { Geolocation} from 'ionic-native';

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
  useCurrentLocation = false;
  useCurrentLocationColor: string;
  useManualLocationColor: string;
  loading: any;
  headers = new Headers({ 
                'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});

  constructor(public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public http: Http,
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public userData: UserData) {}
  ionViewWillEnter() {
    this.chooseLocation(1);
    this.user.role = 4;
  }
chooseLocation(target){
    if(target == 1) {
      this.useCurrentLocation = false;
      this.useCurrentLocationColor = "dark";
      this.useManualLocationColor = "default";
    } else if(target == 0) {
      this.getCurrentLocation();
      this.useCurrentLocation = true;
      this.useCurrentLocationColor = "default";
      this.useManualLocationColor = "dark";
    }
  }
  getLatitudeLongitude(address){
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address},(results, status)=> {
      if(status=='OK') {
        let lokasi = results[0];
        this.lokasi.alamat = address;
        this.lokasi.lat = lokasi.geometry.location.lat();
        this.lokasi.lng = lokasi.geometry.location.lng();
        this.postUser();
      } else{
        this.loading.dismiss();
        this.showAlert("Tidak dapat menemukan lokasi anda");
      }
    });
  }
  getAddress(){
    let geocoder = new google.maps.Geocoder();
    let latlng = {lat: this.lokasi.lat, lng: this.lokasi.lng};
    this.lokasi.alamat = "";
    geocoder.geocode({'location': latlng},(results, status)=> {
      this.loading.dismiss();
      if(status=='OK') {
        this.lokasi.alamat = results[0].formatted_address;
      } else{
        this.showAlert("Tidak dapat menemukan alamat Anda");
      }
    });
  }
  getCurrentLocation(){
    this.loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });
    this.loading.present();
    Geolocation.getCurrentPosition().then((position) => {
      this.lokasi.lng = position.coords.longitude;
      this.lokasi.lat = position.coords.latitude;
      this.getAddress();
    }, (err) => {
      this.loading.dismiss();
      console.log(err);
    });
  }
  postUser(){
  	let input = JSON.stringify({
        username: this.user.username, 
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
      if(this.useCurrentLocation) {
        this.postUser();
      } else{
        this.getLatitudeLongitude(this.inputAlamat);
      }
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
