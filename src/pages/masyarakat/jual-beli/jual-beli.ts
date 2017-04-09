import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';
import { UserData } from '../../../providers/user-data';

/*
  Generated class for the JualBeli page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-jual-beli',
  templateUrl: 'jual-beli.html'
})
export class JualBeliPage {
  public dagangan: any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public userData: UserData,
  	public authHttp: AuthHttp,
  	public toastCtrl: ToastController
  	) {}

  ionViewWillEnter() {
    this.getJualan();
  }
  getJualan() {
    
    this.authHttp.get(this.userData.BASE_URL+'dagangan/get').subscribe(res => {
        let response = res.json();
        console.log(response);
        if(response.status == 200) {
          this.dagangan = response.data;
        } else if(response.status == 204){
          this.dagangan = [];
        }
      }, err => { 
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
