import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { AuthHttp } from 'angular2-jwt';
/*
  Generated class for the ListPetani page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-petani',
  templateUrl: 'list-petani.html'
})
export class ListPetaniPage {
	public userPetani = [];
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public authHttp: AuthHttp,
    public userData: UserData,
    public toastCtrl: ToastController) {}

  ionViewWillEnter(){
    this.getData();
  }

  getData() {
    this.authHttp.get(this.userData.BASE_URL+'user/get/role/4').subscribe(res => {
      let response = res.json();
      if(response.status == 200) {
	    this.userPetani = response.data;
      } else if(response.status == 204) {
      	this.userPetani = [];
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
