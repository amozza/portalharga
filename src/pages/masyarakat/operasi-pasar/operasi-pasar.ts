import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../../providers/user-data';
import { KirimOperasiPasarPage } from '../kirim-operasi-pasar/kirim-operasi-pasar';

/*
  Generated class for the OperasiPasar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-operasi-pasar',
  templateUrl: 'operasi-pasar.html'
})
export class OperasiPasarPage {

  submitted: boolean = false;
  operasi:{pasar?: string, subject?: string, opini?: string} = {};
  dataOperasi:any ;
  options:any;
  us_id:any;
  constructor(
  	public navCtrl: NavController,
  	public http: Http, 
  	public toastCtrl: ToastController,
    public userData: UserData,
  	public navParams: NavParams) {}

  ionViewWillEnter() {
    this.userData.getId().then((value)=>{
      this.us_id = value;
    });
    //this.getOperasi();
  }

  getOperasi() {
    this.userData.getToken().then((value) => {
      let headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value,
        'login_type' : '1'
      });
      this.options = new RequestOptions({ headers: headers});
      
      this.http.get(this.userData.BASE_URL+'operasi-pasar/get/'+this.us_id,this.options).subscribe(res => {
        let a = res.json();
        console.log(a);
        this.dataOperasi = a.data;
      }, err => { console.log(err);
          this.showError(err);
      });
    });
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

  kirimOperasiPasar() {
    this.navCtrl.push(KirimOperasiPasarPage);
  }
}
