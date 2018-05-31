import { Component } from '@angular/core';
import { NavController, App, NavParams, LoadingController, ToastController, IonicPage } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../providers/user-data';

/*
  Generated class for the VerifikasiAkun page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-verifikasi-akun',
  templateUrl: 'verifikasi-akun.html'
})
export class VerifikasiAkunPage {
  headers = new Headers({ 
                'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});
  username: string;
  email: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userData: UserData,
    public http: Http,
    public app: App,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController) {
      let data = this.navParams.data;
      this.username = data.username;
      this.email = data.email;
    }
  login(){
    this.app.getRootNav().setRoot('LoginPage');
  }
  reSendVerification(){
    let loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });
    loading.present();
    let input = JSON.stringify({
        username: this.username
      });
    this.http.post(this.userData.BASE_URL+"user/email/validate/resend",input,this.options).subscribe(data => {
        loading.dismiss();
        let response = data.json();
        if(response.status == 200){
          this.showAlert("Sukses mengirimkan verifikasi ke email anda");
        }
    }, err => { 
        loading.dismiss();
        this.showError(err);
    });
  }
  showError(err: any){  
    err.status==0? 
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  showAlert(val){
    let toast = this.toastCtrl.create({
      message: val,
      duration: 5000
    });
    toast.present();
  };
}
