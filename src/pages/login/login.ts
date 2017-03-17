import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController,ToastController,LoadingController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';

import { SignupPilihanPage } from '../signup-pilihan/signup-pilihan';
import { TabsPage } from '../petani/tabs-petani/tabs';
import { TabsMasyarakatPage } from '../masyarakat/tabs-masyarakat/tabs-masyarakat';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;
  headers = new Headers({ 
                'Content-Type': 'application/json',
                'login_type':'1'});
  options = new RequestOptions({ headers: this.headers});

  constructor(
    public navCtrl: NavController, 
    public http: Http,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public userData: UserData) { }

  onLogin(form: NgForm) {
    this.submitted = true;
    let loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });

    if (form.valid) {
    loading.present();
      let input = JSON.stringify({
        username: this.login.username, 
        password: this.login.password
      });
      setTimeout(()=>{
        this.http.post(this.userData.BASE_URL+"api/auth",input,this.options).subscribe(data => {
           let response = data.json();
           loading.dismiss();
           if(response.status == '200') {
             this.userData.login(response.data);
             this.userData.setToken(response.token);
             switch (response.data.role) {
               case 1:
                 this.navCtrl.setRoot(TabsPage);
                 break;
               case 2:
                 this.navCtrl.setRoot(TabsMasyarakatPage);
                 break;
               
               default:
                 // code...
                 break;
             }
             // this.navCtrl.setRoot(TabsPage);
           }
           this.showToast(response.message);
           console.log(response.message);
           console.log(data);
        }, err => { 
           loading.dismiss();
           err.status==0?   
           this.showToast("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
           this.showToast("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
        });
      },3000);
    }
  }
  onSignup() {
    this.navCtrl.push(SignupPilihanPage);
  }

  showToast(val){
    let toast = this.toastCtrl.create({
      message: val,
      duration: 3000
    });
    toast.present();
  };
}
