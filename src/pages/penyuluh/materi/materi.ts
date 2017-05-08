import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController, LoadingController} from 'ionic-angular';
import { TambahMateriPage } from '../tambah-materi/tambah-materi';
import { AuthHttp } from 'angular2-jwt';
import { UserData } from "../../../providers/user-data";
import { EditMateriPage } from "../edit-materi/edit-materi";
/*
  Generated class for the Materi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-materi',
  templateUrl: 'materi.html'
})
export class MateriPage {
  materi:any;
  loading: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authHttp: AuthHttp,
    public userData: UserData,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public loadCtrl: LoadingController) {}

  ionViewWillEnter() {
    this.getMateri();
  }

  tambahMateri(){
    this.navCtrl.push(TambahMateriPage);
  }
  getMateri(){
    this.authHttp.get(this.userData.BASE_URL+'materi/get').subscribe(res => {
      let response = res.json();
      console.log(response);
      if(response.status == 200) {
        this.materi = response.data;
      } else if(response.status == 204){
        this.materi = [];
      }
    }, err => { console.log(err);
        this.showError(err);
    });
  }
  hapusMateri(materi_id){
    this.loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });
    this.loading.present();
    let param = JSON.stringify({
      materi_id : materi_id
    });
    this.authHttp.post(this.userData.BASE_URL+'materi/delete',param).subscribe(res => {
      this.loading.dismiss();
      let response = res.json();
      if(response.status == 200) {
        this.getMateri();
        this.showAlert(response.message);
      }
    }, err => { 
      this.loading.dismiss();
      this.showError(err);
    });
  }
  presentActionSheet(dataMateri) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Unduh materi',
          role: 'unduhFile',
          handler: () => {
            window.open(dataMateri.file);
          }
        },
        {
          text: 'Edit materi',
          role: 'editFile',
          handler: () => {
            this.navCtrl.push(EditMateriPage,dataMateri);
          }
        },
        {
          text: 'Hapus materi',
          role: 'hapusFile',
          handler: () => {
            this.hapusMateri(dataMateri.materi_id);
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
