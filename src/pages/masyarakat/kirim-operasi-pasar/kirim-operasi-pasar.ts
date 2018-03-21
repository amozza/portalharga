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

  
  constructor(public navCtrl: NavController, 
  	public authHttp: AuthHttp, 
  	public toastCtrl: ToastController,
    public userData: UserData,
    public navParams: NavParams,
    public loadCtrl: LoadingController
  ) {}

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
      this.getProvinsi();
    } else if(target == 0) {
      this.getCurrentLocation();
      console.log('alamatnya', this.lokasi)
      this.useCurrentLocation = true;
      this.useCurrentLocationColor = "default";
      this.useManualLocationColor = "dark";
    }
  }

  // Get Location API
  getProvinsi(){
    this.authHttp.get(this.userData.BASE_URL+"lokasi/provinsi").subscribe(data => {
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
    this.authHttp.get(this.userData.BASE_URL+"lokasi/kabupaten/"+idProvinsi).subscribe(data => {
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
    this.authHttp.get(this.userData.BASE_URL+"lokasi/kecamatan/"+idKabupaten).subscribe(data => {
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
    this.authHttp.get(this.userData.BASE_URL+"lokasi/kelurahan/"+idKecamatan).subscribe(data => {
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
        this.showAlert("Tidak dapat menemukan koordinat alamat Anda");
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

  postOperasiPasar(){
    this.submitted = false;
    let input = JSON.stringify({
      komoditas_id: this.operasi.komoditas, 
      pesan: this.operasi.pesan,
      latitude: this.lokasi.lat,
      longitude: this.lokasi.lng,
      alamat: this.lokasi.alamat
    });
    this.authHttp.post(this.userData.BASE_URL+"operasiPasar/add",input).subscribe(data => {
       this.loading.dismiss()
       let response = data.json();
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
        this.getLatitudeLongitude(this.inputAlamat+" "+this.namaKelurahan+" "+this.namaKecamatan+" "+this.namaKabupaten+" "+this.namaProvinsi);
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
