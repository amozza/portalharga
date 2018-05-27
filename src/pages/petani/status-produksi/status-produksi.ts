import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController, IonicPage } from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';
import { UserData } from '../../../providers/user-data';

/*
  Generated class for the StatusProduksi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-status-produksi',
  templateUrl: 'status-produksi.html'
})
export class StatusProduksiPage {

  public produksi:any ;
  public token: string;
  public id: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userData: UserData,
    public authHttp: AuthHttp,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController) {}

  ionViewWillEnter() {
    this.userData.getId().then((value)=>{
      this.id = value;
      this.getDataProduksi();
    });
  }

  getDataProduksi() {
    this.authHttp.get(this.userData.BASE_URL+'produksi/get/user/'+this.id).subscribe(res => {
      let response = res.json();
      if (response.status == 200){
        this.produksi = response.data;
      } else if(response.status == 204){
        this.produksi = [];
      }
      
    }, err => { console.log(err);
        this.showError(err);
    });
  }
  
  tambahProduksi(){
    this.navCtrl.push('KirimStatusProduksiPage');
  }

  editProduksi(dataProduksi){
    this.navCtrl.push('EditStatusProduksiPage',dataProduksi);
  }

  hapusProduksi(dataProduksi){
    let param = JSON.stringify({
        produksi_id : dataProduksi.produksi_id
    });
    this.authHttp.post(this.userData.BASE_URL+'produksi/delete',param).subscribe(res => {
      let response = res.json();
      if(response.status == 200) {
        this.getDataProduksi();
      } 
      this.showAlert(response.message);
    }, err => { 
      this.showError(err);
    });
  }

  presentActionSheet(dataProduksi) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Hapus Produksi',
          role: 'hapusProduksi',
          handler: () => {
            this.hapusProduksi(dataProduksi);
          }
        },
        {
          text: 'Edit Produksi',
          role: 'editProduksi',
          handler: () => {
            this.editProduksi(dataProduksi);
          }
        }
      ]
    });
    actionSheet.present();
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
