import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ToastController, LoadingController, IonicPage } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { AuthHttp } from 'angular2-jwt';

/*
  Generated class for the GantiPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-ganti-password',
  templateUrl: 'ganti-password.html'
})
export class GantiPasswordPage {
	public oldPassword: string;
	public newPassword: string;
	public reTypePassword: string;
	public user_id:string;
	public submitted=false;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public loadCtrl: LoadingController,
  	public authHttp: AuthHttp,
  	public userData: UserData,
  	public toastCtrl: ToastController
  	) {}

  ionViewWillEnter(){
  	this.userData.getId().then((value)=>{
  		this.user_id = value;
    });
  }
  onUpdate(form: NgForm) {
    if(this.newPassword == this.reTypePassword) {    	
	    this.submitted = true;
	    let loading = this.loadCtrl.create({
  	    	content: 'Tunggu sebentar...'
  		});

	    if (form.valid) {
	    	loading.present();
	      let param = JSON.stringify({
       	  user_id : this.user_id,
       	  old_password : this.oldPassword,
          new_password : this.newPassword
        });
	      this.authHttp.post(this.userData.BASE_URL+'user/updatePassword',param).subscribe(res => {
	      	loading.dismiss();
	        let a = res.json();
	        if(a.status == 200) {
	          this.showAlert(a.message);
	          this.navCtrl.popToRoot();
	        }
	      }, err => { 
	      	loading.dismiss();
	      	console.log(err);
	        this.showError(err);
	      });

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
      duration: 5000
    });
    toast.present();
  }
}
