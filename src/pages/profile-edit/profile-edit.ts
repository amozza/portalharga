import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Http ,Headers,RequestOptions} from '@angular/http';

/*
  Generated class for the ProfileEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html'
})
export class ProfileEditPage {
  profile: {us_id?: string, username?: string, nama?: string, email?: string, password?: string} = {};
  submitted = false;
  token: string;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public userData: UserData,
  	public toastCtrl: ToastController,
  	public loadCtrl: LoadingController,
  	public http: Http) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileEditPage');
  }
  ionViewWillEnter(){
  	this.userData.getData().then((value)=>{
      this.profile.username = value.username;
      this.profile.nama = value.name;
      this.profile.email = value.email;
      this.profile.us_id = value.us_id;
    });
    this.userData.getToken().then((value)=>{
      this.token = value;
    });
  }
  onUpdate(form: NgForm) {
    this.submitted = true;
    let loading = this.loadCtrl.create({
    	content: 'Tunggu sebentar...'
	});

    if (form.valid) {
    	loading.present();
      let headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': this.token
      });
      let options = new RequestOptions({ headers: headers});
       let param = JSON.stringify({
       	  us_id : this.profile.us_id,
          username : this.profile.username,
          name : this.profile.nama,
          email : this.profile.email,
          old_password : this.profile.password
        });
      this.http.post(this.userData.BASE_URL+'user/update',param,options).subscribe(res => {
      	loading.dismiss();
        let a = res.json();
        console.log(a);
        if(a.status == '200') {
          this.userData.login(a.result);
          this.showAlert(a.message);
          this.navCtrl.popToRoot();
        }
      }, err => { 
      	loading.dismiss();
          err.status==0? 
          this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
          err.status==403?
          this.showAlert(err.message):
          this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
      });

    }
  }
  showAlert(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
