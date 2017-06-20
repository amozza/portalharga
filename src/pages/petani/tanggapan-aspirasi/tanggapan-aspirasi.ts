import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { AuthHttp } from 'angular2-jwt';

/*
  Generated class for the TanggapanAspirasi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tanggapan-aspirasi',
  templateUrl: 'tanggapan-aspirasi.html'
})
export class TanggapanAspirasiPage {
  public tanggapan = [];
  public aspirasi_id: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  	public toastCtrl: ToastController,
    public userData: UserData,
    public authHttp: AuthHttp,
    public loadCtrl: LoadingController) {this.aspirasi_id = navParams.data;}

  ionViewWillEnter(){
    this.getTanggapan();
  }
  getTanggapan() {
    this.authHttp.get(this.userData.BASE_URL+'aspirasi/tanggapan/get/'+this.aspirasi_id).subscribe(res => {
      let response = res.json();
      console.log(response);
      if(response.status == 200) {
        this.tanggapan = response.data;
      } else if(response.status == 204){
        this.tanggapan = [];
      }
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
