import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Http,Headers,RequestOptions } from '@angular/http';
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
  operasi:{pasar?: string, komoditas?: string, opini?: string} = {};
  options: any;
  us_id: any;
  lokasi: string;
  dataKomoditas = [];
  constructor(public navCtrl: NavController, 
  	public http: Http, 
  	public toastCtrl: ToastController,
    public userData: UserData,
    public navParams: NavParams,
    public loadCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad KirimOperasiPasarPage');
  }
  ionViewWillEnter(){
  	this.getKomoditas();
   
    this.userData.getId().then((value) => {
      this.us_id = value;
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
  getMyLocation(){
    let loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });
    loading.present();
    Geolocation.getCurrentPosition().then((position) => {
      let latlng = {lat: position.coords.latitude, lng: position.coords.longitude};
      let geocoder = new google.maps.Geocoder();
      this.lokasi="coba";
      geocoder.geocode({'location': latlng},(results, status)=> {
        if(status=='OK') {
          this.lokasi = results[0].formatted_address;
        } else{
          this.showAlert("Tidak dapat menemukan alamat Anda");
        }
        loading.dismiss();
      });
    }, (err) => {
      loading.dismiss();
      this.showAlert("Tidak dapat menemukan posisi Anda");
    });
  }

  submit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.submitted = false;
      let input = JSON.stringify({
        komoditas: this.operasi.komoditas, 
        pesan: this.operasi.opini,
        lokasi: this.lokasi,
        us_id: this.us_id,
        email: 'pake dari collection user aja'
      });
      this.http.post(this.userData.BASE_URL+"masyarakat/addOperasi",input,this.options).subscribe(data => {
         let response = data.json();
         console.log(response);
         if(response.status == '200') {
            this.navCtrl.popToRoot();
            this.showAlert("Opini kamu telah dikirim");
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
