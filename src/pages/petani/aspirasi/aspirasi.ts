import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams, ToastController,LoadingController} from 'ionic-angular';
import { TambahAspirasiPage } from '../tambah-aspirasi/tambah-aspirasi';
import { PendukungPage } from '../pendukung/pendukung';
import { EditAspirasiPage } from '../edit-aspirasi/edit-aspirasi';
import { UserData } from '../../../providers/user-data';
import { AuthHttp } from 'angular2-jwt';
/*
  Generated class for the Coba page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-aspirasi',
  templateUrl: 'aspirasi.html'
})
export class AspirasiPage {
	public aspirasi: any;
  public limit = 0;
  public user_id: string;
  public loading: any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
  	public toastCtrl: ToastController,
    public userData: UserData,
    public authHttp: AuthHttp,
    public loadCtrl: LoadingController
  	) { }
  ionViewWillEnter() {
    this.userData.getId().then((value)=>{
      this.user_id = value;
    this.getAspirasi();
    });
    this.loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });
  }
  doRefresh(refresher) {
    setTimeout(() => {
      this.getAspirasi();
      refresher.complete();
    }, 1500);
  }
  getAspirasi() {
    this.authHttp.get(this.userData.BASE_URL+'aspirasi/get').subscribe(res => {
      let response = res.json();
      if(response.status == 200) {
        this.aspirasi = response.data;
      } else if(response.status == 204){
        this.aspirasi = [];
      }
    }, err => { console.log(err);
        this.showError(err);
    });
  }

  dukungAspirasi(aspirasi_id){
   let param = JSON.stringify({
      aspirasi_id : aspirasi_id
    });

    this.authHttp.post(this.userData.BASE_URL+'aspirasi/pendukung/add',param).subscribe(res => {
      let response = res.json();
      if(response.status == 200) {
        this.getAspirasi();
        this.showAlert(response.message);
      } 
    }, err => { 
        this.showError(err);
    });
  }
  batalDukungAspirasi(aspirasi_id){
   let param = JSON.stringify({
      aspirasi_id : aspirasi_id
    });

    this.authHttp.post(this.userData.BASE_URL+'aspirasi/pendukung/delete',param).subscribe(res => {
      let response = res.json();
      if(response.status == 200) {
        this.getAspirasi();
        this.showAlert(response.message);
      }
    }, err => { 
        this.showError(err);
    });
  }
  hapusAspirasi(aspirasi_id){
    this.loading.present();
    let param = JSON.stringify({
      aspirasi_id : aspirasi_id
    });
    this.authHttp.post(this.userData.BASE_URL+'aspirasi/delete',param).subscribe(res => {
      this.loading.dismiss();
      let response = res.json();
      if(response.status == 200) {
        this.getAspirasi();
        this.showAlert(response.message);
      }
    }, err => { 
      this.loading.dismiss();
      this.showError(err);
    });
  }
  editAspirasi(dataAspirasi){
    this.navCtrl.push(EditAspirasiPage,dataAspirasi);
  }
  presentActionSheet(dataAspirasi) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Edit aspirasi',
          role: 'editAspirasi',
          handler: () => {
            this.editAspirasi(dataAspirasi);
          }
        },
        {
          text: 'Hapus aspirasi',
          role: 'hapusAspirasi',
          handler: () => {
            this.hapusAspirasi(dataAspirasi.aspirasi_id);
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
  tambahAspirasi() {
    this.navCtrl.push(TambahAspirasiPage);
  }
  lihatPendukung(aspirasi_id) {
     this.navCtrl.push(PendukungPage,aspirasi_id);
  }

  showAlert(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}