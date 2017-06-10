import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController,ToastController,LoadingController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';

import { SignupPilihanPage } from '../signup-pilihan/signup-pilihan';
import { TabsPage } from '../petani/tabs-petani/tabs';
import { TabsMasyarakatPage } from '../masyarakat/tabs-masyarakat/tabs-masyarakat';
import { TabsPedagangPage } from '../pedagang/tabs-pedagang/tabs-pedagang';
import { TabsPenyuluhPage } from '../penyuluh/tabs-penyuluh/tabs-penyuluh';
import { UserData } from '../../providers/user-data';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { VerifikasiAkunPage } from "../verifikasi-akun/verifikasi-akun";

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  headers = new Headers({ 
                'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});

  constructor(
    public navCtrl: NavController, 
    public http: Http,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public userData: UserData) { }
  ionViewWillEnter(){
  }
  onLogin(form: NgForm) {
    this.submitted = true;
    let loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });

    if (form.valid) {
    loading.present();
      let input = JSON.stringify({
        username: this.login.username.toLowerCase(), 
        password: this.login.password,
        login_type: 1
      });
        this.http.post(this.userData.BASE_URL+"user/auth",input,this.options).subscribe(data => {
           let response = data.json();
           loading.dismiss();
           if(response.status == 200) {
            if(response.data.isValidate){
              this.userData.login(response.data);
              this.userData.setToken(response.token);
              setTimeout(() => { this.userData.getKomoditasFromServer(); }, 100);
              switch (response.data.role) {
                case 3: //penyuluh
                  this.navCtrl.setRoot(TabsPenyuluhPage);
                  break;
                case 4: //petani
                  this.navCtrl.setRoot(TabsPage);
                  break;
                case 5: //masyarakat
                  this.navCtrl.setRoot(TabsMasyarakatPage);
                  break;
                case 6: //pedagang
                  this.navCtrl.setRoot(TabsPedagangPage);
                  break;
                
                default:
                  // code...
                  break;
              }

            } else{
              this.navCtrl.setRoot(VerifikasiAkunPage,response.data);
            }
           } else {
             this.showAlert(response.message);
           }
        }, err => { 
           loading.dismiss();
           this.showError(err);
        });
      
    }
  }
  onSignup() {
    this.navCtrl.push(SignupPilihanPage);
  }
  onForgotPassword(){
    this.navCtrl.push(ForgetPasswordPage);
  }
  showError(err: any){  
    err.status==0? 
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  showAlert(val){
    let toast = this.toastCtrl.create({
      message: val,
      duration: 3000
    });
    toast.present();
  };
}
