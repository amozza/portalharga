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
@Component({
  selector: 'page-tambah-info-harga',
  templateUrl: 'tambah-info-harga.html'
})
export class TambahInfoHargaPage {
  submitted = false;
  post:{komoditas?: string, harga?: number, satuanHarga?: string} = {};
  lokasi:{lat?: number, lng?: number}={};
  options: any;
  id: string;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public userData: UserData,
  	public http: Http,
  	public toastCtrl: ToastController
  	) {}

  ionViewWillEnter() {
    this.getCurrentLocation();
    this.userData.getToken().then((value) => {
      let headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value,
        'login_type' : '1'
      });
      this.options = new RequestOptions({ headers: headers});
    });

    this.userData.getId().then((value) => {
      this.id = value;
    });
  }
  getCurrentLocation(){
    Geolocation.getCurrentPosition().then((position) => {
      this.lokasi.lng = position.coords.longitude;
      this.lokasi.lat = position.coords.latitude;
      console.log(this.lokasi);
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
        lokasi: this.lokasi , 
        us_id: this.id
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
