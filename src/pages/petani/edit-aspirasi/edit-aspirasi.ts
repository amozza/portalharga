import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { AuthHttp } from 'angular2-jwt';

/*
  Generated class for the EditAspirasi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-aspirasi',
  templateUrl: 'edit-aspirasi.html'
})
export class EditAspirasiPage {
  submitted: boolean = false;
  aspirasi:{id?: string, subject?: string, isi?: string} = {};
  user_id: any;

  constructor(
  	public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public authHttp: AuthHttp,
  	public navParams: NavParams,
    public userData: UserData
    ) {
  	let data = navParams.data;
  	this.aspirasi.subject = data.subjek;
  	this.aspirasi.isi = data.isi;
  	this.aspirasi.id = data.aspirasi_id;
  }

  submit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.submitted = false;
      let param = JSON.stringify({
        subjek: this.aspirasi.subject, 
        isi: this.aspirasi.isi,
        aspirasi_id : this.aspirasi.id
      }); 
      this.authHttp.post(this.userData.BASE_URL+"aspirasi/update",param).subscribe(data => {
         let response = data.json();
         if(response.status == 200) {
            this.navCtrl.popToRoot();
            this.showAlert("Aspirasi telah diperbarui");
         } else {
           this.showAlert(response);
         }
      }, err => {
        this.navCtrl.popToRoot();
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
