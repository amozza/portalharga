import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import {Camera} from 'ionic-native';
import { AuthHttp } from 'angular2-jwt';

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
  user: {user_id?: string, username?: string, name?: string, email?: string, picture?: string, password?: string} = {};
  base64Image: string;
  submitted = false;
  temp: any;
  loading: any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public userData: UserData,
  	public toastCtrl: ToastController,
  	public loadCtrl: LoadingController,
    public authHttp: AuthHttp
    ) {}

  ionViewWillEnter(){
  	this.userData.getData().then((value)=>{
      this.user.username = value.username;
      this.user.name = value.name;
      this.user.email = value.email;
      this.user.user_id = value.user_id;
      this.user.picture = value.prof_pict;
    });

    this.loading = this.loadCtrl.create({
        content: 'Uploading image...'
    });
  }
  updatePicture() {
    this.takePicture();
  }
  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
      this.loading.present();
      this.base64Image = imageData;
      let param = JSON.stringify({
        user_id : this.user.user_id,
        picture: this.base64Image
      });
      this.authHttp.post(this.userData.BASE_URL+'user/uploadPhoto',param).subscribe(res => {
        let response = res.json();
        if(response.status==200) {
          this.loading.dismiss();
          this.userData.updateProfilePict(response.data.picture);
          this.user.picture = response.data.picture;
          this.showAlert("Berhasil mengubah foto profile"); 
        }         
      }, err => { 
          this.loading.dismiss();
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
      let param = JSON.stringify({
     	  user_id : this.user.user_id,
        username : this.user.username,
        name : this.user.name,
        email : this.user.email,
        password: this.user.password
      });
      this.authHttp.post(this.userData.BASE_URL+'user/update',param).subscribe(res => {
      	loading.dismiss();
        let response = res.json();
        if(response.status == 200) {
          this.userData.login(response.data);
          this.showAlert(response.message);
          this.navCtrl.popToRoot();
        } else if(response.status == 400) {
          this.showAlert(response.message);
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
