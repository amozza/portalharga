import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Http ,Headers,RequestOptions} from '@angular/http';
import {Camera} from 'ionic-native';

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
  profile: {us_id?: string, username?: string, nama?: string, email?: string, picture?: string} = {};
  base64Image: string;
  submitted = false;
  token: string;
  temp: any;
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
      this.profile.picture = value.prof_pict;
    });
    this.userData.getToken().then((value)=>{
      this.token = value;
    });
  }
  updatePicture() {
    this.takePicture();
  }
  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 300,
        targetHeight: 600
    }).then((imageData) => {
      let loading = this.loadCtrl.create({
          content: 'Uploading image...'
      });
      loading.present();
      // imageData is a base64 encoded string
        // this.base64Image = "data:image/jpeg;base64," + imageData;
        this.base64Image = imageData;
        let headers = new Headers({ 
          'Content-Type': 'application/json',
          'token': this.token,
          'login_type' : '1'
          });
        let options = new RequestOptions({ headers: headers});
         let param = JSON.stringify({
            us_id : this.profile.us_id,
            string64: this.base64Image
          });
        this.http.post(this.userData.BASE_URL+'user/upload_photo',param,options).subscribe(res => {
          let a = res.json();
          if(a.status==200) {
             loading.dismiss();
             this.temp = a.prof_pict;
             this.userData.updateProfilePict(a.prof_pict);
             this.profile.picture = "https://ph.yippytech.com/" + a.prof_pict;
          }
          this.showAlert(a.message);          
        }, err => { 
            loading.dismiss();
            this.showError(err);
        });
    }, (err) => {
        console.log(err);
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
        'token': this.token,
        'login_type' : '1'
      });
      let options = new RequestOptions({ headers: headers});
       let param = JSON.stringify({
       	  us_id : this.profile.us_id,
          username : this.profile.username,
          name : this.profile.nama,
          email : this.profile.email
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
      duration: 5000
    });
    toast.present();
  }
}
