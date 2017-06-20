import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams,ToastController,LoadingController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../providers/user-data';

/*
  Generated class for the ForgetPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html'
})
export class ForgetPasswordPage {
  success = false;
  user: {username?: string,email?: string} = {};
  userNotFound = false;
  submitted = false;
  headers = new Headers({ 
                'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public toastCtrl: ToastController,
  	public loadCtrl: LoadingController,
  	public userData: UserData,
  	public http: Http
  	) {this.success = false;}

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.userNotFound = false;
    let loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });

    if (form.valid) {
      loading.present();
      let input = JSON.stringify({
        username: this.user.username.toLowerCase()
      });
      this.http.post(this.userData.BASE_URL+"user/email/forgetPassword",input,this.options).subscribe(data => {
         let response = data.json();
         loading.dismiss();
         if(response.status == 200) {
         	this.success = true;
           this.secreteEmail(response.data);
         } else{
         	this.userNotFound = true;
         }
      }, err => { 
         loading.dismiss();
         this.showError(err);
      });
    }
  }
  secreteEmail(email){
    let a = email.split("@");
    let bintang = "";
   	let n=a[0].length-2;
    while(n--) bintang+="*";
    this.user.email = a[0][0]+bintang+a[0][a[0].length-1]+"@"+a[1];
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
