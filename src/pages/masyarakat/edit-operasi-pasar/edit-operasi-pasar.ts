import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
import { UserData } from '../../../providers/user-data';

declare var google: any;
/*
  Generated class for the EditOperasiPasar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-operasi-pasar',
  templateUrl: 'edit-operasi-pasar.html'
})
export class EditOperasiPasarPage {

  submitted: boolean = false;
  operasi:{id?: string, pesan?: string} = {};

  constructor(public navCtrl: NavController, 
  	public authHttp: AuthHttp, 
  	public toastCtrl: ToastController,
    public userData: UserData,
    public navParams: NavParams,
    public loadCtrl: LoadingController
  ) {
  	let data = navParams.data;
  	this.operasi.pesan = data.pesan;
    this.operasi.id  = data.operasiPasar_id;
  }

  ionViewWillEnter(){
    
  }
  

  submit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.submitted = false;
      let input = JSON.stringify({
        operasiPasar_id: this.operasi.id, 
        pesan: this.operasi.pesan
      });
      this.authHttp.post(this.userData.BASE_URL+"operasiPasar/update",input).subscribe(data => {
         let response = data.json();
         console.log(response);
         if(response.status == 200) {
            this.navCtrl.popToRoot();
            this.showAlert("Opini anda telah diperbarui");
         }
         
      }, err => {
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
