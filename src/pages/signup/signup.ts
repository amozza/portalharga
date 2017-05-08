import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController, NavParams, LoadingController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';

import { TabsPage } from '../petani/tabs-petani/tabs';
import { TabsMasyarakatPage } from '../masyarakat/tabs-masyarakat/tabs-masyarakat';
import { UserData } from '../../providers/user-data';
import { TabsPedagangPage } from '../pedagang/tabs-pedagang/tabs-pedagang';
import { TabsPenyuluhPage } from '../penyuluh/tabs-penyuluh/tabs-penyuluh';
import { VerifikasiAkunPage } from "../verifikasi-akun/verifikasi-akun";

@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  user: {username?: string, name?: string, email?: string, password?: string, role?: any} = {};
  submitted = false;
  headers = new Headers({ 
                'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public http: Http,
    public navParams: NavParams,
    public userData: UserData,
    public loadCtrl: LoadingController
    ) {
    this.user.role = navParams.data;
  }
  
  changeUserType(type: any){
    this.user.role = type;
  }
  onSignup(form: NgForm) {
    this.submitted = true;
    let loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });

    if (form.valid) {
      loading.present();
      let input = JSON.stringify({
        username: this.user.username, 
        name: this.user.name, 
        email: this.user.email, 
        password: this.user.password, 
        role: this.user.role,
        login_type : 1
      });
      this.http.post(this.userData.BASE_URL+"user/add",input,this.options).subscribe(data => {
           loading.dismiss();
           let response = data.json();
           if(response.status == 200){
              this.navCtrl.setRoot(VerifikasiAkunPage,response.data);

           }
          //  if(response.status==200) {
          //    this.userData.signup(response.data);
          //    this.userData.setToken(response.token);
          //    setTimeout(() => { this.userData.getKomoditasFromServer(); }, 100);
          //    switch (response.data.role) {
          //      case 3: //penyuluh
          //        this.navCtrl.setRoot(TabsPenyuluhPage);
          //        break;
          //      case 4: //petani
          //        this.navCtrl.setRoot(TabsPage);
          //        break;
          //      case 5: //masyarakat
          //        this.navCtrl.setRoot(TabsMasyarakatPage);
          //        break;
          //      case 6: //pedagang
          //        this.navCtrl.setRoot(TabsPedagangPage);
          //        break;
               
          //      default:
          //        // code...
          //        break;
          //    }
          //  }
           this.showAlert(response.message);
        }, err => { 
           loading.dismiss();
           this.showError(err);
        });
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
