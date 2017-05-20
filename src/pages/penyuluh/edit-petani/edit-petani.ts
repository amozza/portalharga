import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { UserData } from "../../../providers/user-data";
import { AuthHttp } from 'angular2-jwt';

/*
  Generated class for the EditPetani page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-petani',
  templateUrl: 'edit-petani.html'
})
export class EditPetaniPage {
  user: {user_id?: string, username?: string, name?: string, email?: string, nomor_telepon?: string} = {};
  submitted = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public userData: UserData,
    public authHttp: AuthHttp) {
      let data =  this.navParams.data;
      this.user.user_id = data.user_id;
      this.user.username = data.username;
      this.user.name = data.name;
      this.user.email = data.email;
      this.user.nomor_telepon = data.nomor_telepon;
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
        nomor_telepon: this.user.nomor_telepon
      });
      this.authHttp.post(this.userData.BASE_URL+'user/update/petani',param).subscribe(res => {
      	loading.dismiss();
        let response = res.json();
        if(response.status == 200) {
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
