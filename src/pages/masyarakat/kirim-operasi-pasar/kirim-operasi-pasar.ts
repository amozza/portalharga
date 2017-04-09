import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { UserData } from '../../../providers/user-data';
import { Geolocation} from 'ionic-native';

declare var google: any;
/*
  Generated class for the KirimOperasiPasar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-kirim-operasi-pasar',
  templateUrl: 'kirim-operasi-pasar.html'
})
export class KirimOperasiPasarPage {
  submitted: boolean = false;
  operasi:{pasar?: string, komoditas?: string, pesan?: string} = {};
  lokasi:{lat?: number, lng?: number, alamat?: string} = {};
  user_id: any;
  dataKomoditas = [];
  useCurrentLocation = false;
  useCurrentLocationColor: string;
  useManualLocationColor: string;
  loading: any;
  inputAlamat: string;

  constructor(public navCtrl: NavController, 
  	public authHttp: AuthHttp, 
  	public toastCtrl: ToastController,
    public userData: UserData,
    public navParams: NavParams,
    public loadCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad KirimOperasiPasarPage');
  }
  ionViewWillEnter(){
    this.userData.getId().then((value) => {
      this.user_id = value;
    });
    this.userData.getKomoditas().then((value) => {
      this.dataKomoditas = value;
    });
    this.chooseLocation(1);
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
        this.postOperasiPasar();
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

  // getMyLocation(){
  //   let loading = this.loadCtrl.create({
  //       content: 'Tunggu sebentar...'
  //   });
  //   loading.present();
  //   Geolocation.getCurrentPosition().then((position) => {
  //     let latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
  //     let geocoder = new google.maps.Geocoder();
  //     geocoder.geocode({'location': latlng},(results, status)=> {
  //       if(status=='OK') {
  //         this.lokasi.alamat = results[0].formatted_address;
  //       } else{
  //         this.showAlert("Tidak dapat menemukan alamat Anda");
  //       }
  //       loading.dismiss();
  //     });
  //   }, (err) => {
  //     loading.dismiss();
  //     this.showAlert("Tidak dapat menemukan posisi Anda");
  //   });
  // }
  postOperasiPasar(){
    this.submitted = false;
    let input = JSON.stringify({
      komoditas_id: this.operasi.komoditas, 
      pesan: this.operasi.pesan,
      latitude: this.lokasi.lat,
      longitude: this.lokasi.lng,
      alamat: this.lokasi.alamat
    });
    console.log(input);
    this.authHttp.post(this.userData.BASE_URL+"operasiPasar/add",input).subscribe(data => {
       this.loading.dismiss()
       let response = data.json();
       console.log(response);
       if(response.status == 200) {
          this.navCtrl.popToRoot();
          this.showAlert("Operasi pasar berhasil dikirim");
       }
       
    }, err => {
      this.loading.dismiss();
        this.showError(err);
    });
  }
  submit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.loading = this.loadCtrl.create({
          content: 'Tunggu sebentar...'
      });
      this.loading.present();
      if(this.useCurrentLocation) {
        this.postOperasiPasar();
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

  showAlert(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
