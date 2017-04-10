import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,ActionSheetController} from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';
import { UserData } from '../../../providers/user-data';
import { KirimOperasiPasarPage } from '../kirim-operasi-pasar/kirim-operasi-pasar';
import { EditOperasiPasarPage } from '../edit-operasi-pasar/edit-operasi-pasar';
import { PendukungOperasiPasarPage } from '../pendukung-operasi-pasar/pendukung-operasi-pasar';

/*
  Generated class for the OperasiPasar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-operasi-pasar',
  templateUrl: 'operasi-pasar.html'
})
export class OperasiPasarPage {

  submitted: boolean = false;
  operasi:{pasar?: string, subject?: string, opini?: string} = {};
  dataOperasi:any ;
  user_id:any;
  constructor(
  	public navCtrl: NavController,
  	public authHttp: AuthHttp, 
  	public toastCtrl: ToastController,
    public userData: UserData,
  	public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController
    ) {}

  ionViewWillEnter() {
    this.userData.getId().then((value)=>{
      this.user_id = value;
    });
    this.getOperasi();
  }

  getOperasi() {
    this.authHttp.get(this.userData.BASE_URL+'operasiPasar/get').subscribe(res => {
        let response = res.json();
        console.log(response);
        if(response.status == 200) {
          this.dataOperasi = response.data;
        } else if(response.status == 204) {
          this.dataOperasi = [];
        }
      }, err => { console.log(err);
          this.showError(err);
      });
  }
  lihatPendukung(idOperasi){
     this.navCtrl.push(PendukungOperasiPasarPage,idOperasi);
  }
  dukungOperasi(idOperasi){
    let param = JSON.stringify({
      operasiPasar_id : idOperasi
    });

    this.authHttp.post(this.userData.BASE_URL+'operasiPasar/pendukung/add',param).subscribe(res => {
      let response = res.json();
      if(response.status == 200) {
        this.getOperasi();
        this.showAlert(response.message);
      } 
    }, err => { 
        this.showError(err);
    });
  }
  batalDukungOperasi(idOperasi){
    let param = JSON.stringify({
      operasiPasar_id : idOperasi
    });

    this.authHttp.post(this.userData.BASE_URL+'operasiPasar/pendukung/delete',param).subscribe(res => {
      let response = res.json();
      if(response.status == 200) {
        this.getOperasi();
        this.showAlert(response.message);
      } 
    }, err => { 
        this.showError(err);
    });
  }
  hapusOperasiPasar(idOperasi){
    let param = JSON.stringify({
        operasiPasar_id : idOperasi
      });
     console.log(param);
    this.authHttp.post(this.userData.BASE_URL+'operasiPasar/delete',param).subscribe(res => {
      let response = res.json();
      console.log(response);
      if(response.status == 200) {
        this.getOperasi();
        this.showAlert(response.message);
      }
    }, err => { 
      this.showError(err);
    });
  }
  presentActionSheet(data) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Edit operasi pasar',
          role: 'editOperasiPasar',
          handler: () => {
            this.navCtrl.push(EditOperasiPasarPage,data);
          }
        },
        {
          text: 'Hapus operasi pasar',
          role: 'hapusOperasiPasar',
          handler: () => {
             this.hapusOperasiPasar(data.operasiPasar_id);
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

  kirimOperasiPasar() {
    this.navCtrl.push(KirimOperasiPasarPage);
  }
}
