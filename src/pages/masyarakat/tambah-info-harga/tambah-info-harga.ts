import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation} from 'ionic-native';
import { Http ,Headers,RequestOptions} from '@angular/http';
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
  post:{komoditas?: string, harga?: number, satuanHarga?: string} = {};
  lokasi:{lat?: number, lng?: number}={};
  dataKomoditas=[];
  options: any;
  id: string;
  alamat: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public userData: UserData,
  	public http: Http,
  	public toastCtrl: ToastController
  	) { }

  ionViewWillEnter() {
    this.getCurrentLocation();
    this.getKomoditas();
    this.userData.getId().then((value) => {
      this.id = value;
    });
  }
  getKomoditas() {
    this.userData.getToken().then((value) => {
      let headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value,
        'login_type' : '1'
      });
      this.options = new RequestOptions({ headers: headers});
      
      this.http.get(this.userData.BASE_URL+'setKomoditas/jenisKomoditas',this.options).subscribe(res => {
        let a = res.json();
        this.dataKomoditas = a.data;
      }, err => { 
          this.showError(err);
      });
    });
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
        jenis: this.post.komoditas,
        harga: this.post.harga,
        latitude: this.lokasi.lat,
        longitude: this.lokasi.lng, 
        us_id: this.id,
        alamat: this.alamat
      });
      this.http.post(this.userData.BASE_URL+"masyarakat/addKom",input,this.options).subscribe(data => {
         let response = data.json();
         console.log(response);
         if(response.status == '200') {
            this.navCtrl.popToRoot();
            this.showAlert("Terima kasih telah mengirim info harga");
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
    err.status==403?
    this.showAlert(err.message):
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
