import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';
import { UserData } from '../../../providers/user-data';
/*
  Generated class for the PendukungOperasiPasar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pendukung-operasi-pasar',
  templateUrl: 'pendukung-operasi-pasar.html'
})
export class PendukungOperasiPasarPage {

  public operasiPasar_id: string;
  public pendukung: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authHttp: AuthHttp,
    public userData: UserData,
    public toastCtrl: ToastController) {
  	this.operasiPasar_id = navParams.data;
  }

  ionViewWillEnter(){
    this.getData();
  }

  getData() {
    this.authHttp.get(this.userData.BASE_URL+'operasiPasar/pendukung/get/'+this.operasiPasar_id).subscribe(res => {
      let response = res.json();
      console.log(response);
      this.pendukung = response.data;
    }, err => { console.log(err);
        this.showError(err);
    });
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
