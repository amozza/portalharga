import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, IonicPage } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { AuthHttp } from 'angular2-jwt';

/*
  Generated class for the Pendukung page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-pendukung',
  templateUrl: 'pendukung.html'
})
export class PendukungPage {
  public aspirasi_id: string;
  public pendukung: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authHttp: AuthHttp,
    public userData: UserData,
    public toastCtrl: ToastController) {
  	this.aspirasi_id = navParams.data;
  }

  ionViewWillEnter(){
    this.getData();
  }

  getData() {
    this.authHttp.get(this.userData.BASE_URL+'aspirasi/pendukung/get/'+this.aspirasi_id).subscribe(res => {
      let response = res.json();
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
