import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController, IonicPage } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { TambahJualKomoditasPage } from '../tambah-jual-komoditas/tambah-jual-komoditas';
import { EditJualKomoditasPage } from '../edit-jual-komoditas/edit-jual-komoditas';
import { AuthHttp } from 'angular2-jwt';

/*
  Generated class for the JualKomoditas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-jual-komoditas',
  templateUrl: 'jual-komoditas.html'
})
export class JualKomoditasPage {
  public jualanku: any;
  public user_id: string;
  public role: string;
  public choosedKomoditas: string = 'All';
  public dataKomoditas = [];
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public userData: UserData,
  	public authHttp: AuthHttp,
  	public actionSheetCtrl: ActionSheetController,
  	public toastCtrl: ToastController) {}

  ionViewWillEnter() {
    this.userData.getId().then((value)=>{
      this.user_id = value;
    });
    this.userData.getRole().then((value)=>{
      this.role = value;
    });
    this.userData.getKomoditas().then((value) => {
      this.dataKomoditas = value;
    });
    this.getJualan();
  }

  getJualan() {
    this.authHttp.get(this.userData.BASE_URL+'dagangan/get').subscribe(res => {
      let response = res.json();
      if(response.status == 200) {
        this.jualanku = response.data;
      } else if(response.status == 204){
        this.jualanku = [];
      }
    }, err => { console.log(err);
        this.showError(err);
    });
  }
  tambahJualan(){
  	this.navCtrl.push(TambahJualKomoditasPage);
  }
  editJualan(dataDagangan){
    this.navCtrl.push(EditJualKomoditasPage,dataDagangan);
  }
  hapusJualan(dataDagangan){
    let param = JSON.stringify({
      dagangan_id : dataDagangan.dagangan_id
    });
    this.authHttp.post(this.userData.BASE_URL+'dagangan/delete',param).subscribe(res => {
      let response = res.json();
      if(response.status == 200) {
        this.getJualan();
        this.showAlert(response.message);
      }
    }, err => { 
      console.log(err);
      this.showError(err);
    });
  }
  presentActionSheet(dataDagangan) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Edit Penjualan',
          role: 'editpenjualan',
          handler: () => {
            this.editJualan(dataDagangan);
          }
        },
        {
          text: 'Hapus Penjualan',
          role: 'hapuspenjualan',
          handler: () => {
            this.hapusJualan(dataDagangan);
          }
        }
      ]
    });
    actionSheet.present();
  }
  //format uang (pemisah ribuan dengan koma)
  formatCurrency(n, currency):string {
    return currency + " " + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
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
