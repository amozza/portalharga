import { Component } from '@angular/core';
import { NavController, AlertController, App ,ToastController, ActionSheetController, PopoverController, LoadingController} from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { LoginPage } from '../../login/login';
import { ProfileEditPage } from '../../profile-edit/profile-edit';
import { AuthHttp } from 'angular2-jwt';
import { PendukungPage } from '../pendukung/pendukung';
import { PopoverPage } from '../../popover/popover';
import { EditAspirasiPage } from '../edit-aspirasi/edit-aspirasi';
import { EditJualKomoditasPage } from '../edit-jual-komoditas/edit-jual-komoditas';
import { TanggapanAspirasiPage } from "../tanggapan-aspirasi/tanggapan-aspirasi";


/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile-petani',
  templateUrl: 'profile.html'
})
export class ProfilePetaniPage {
	public nama: string;
  public profilePicture: string;
  public aspirasi: any;
  public user_id: string;
  public loading: any;
  public segments:any;
  public jualanku: any; 

  constructor(
  	public alertCtrl: AlertController, 
  	public nav: NavController,
    public app: App,
    public authHttp: AuthHttp,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController, 
  	public userData: UserData,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController) {

  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  ionViewWillEnter(){
    this.getDataProfile();
    this.loading = this.loadingCtrl.create({
        content: 'Tunggu sebentar...'
    });
    this.segments = "aspirasi";
  }
  getDataProfile() {
    this.userData.getUsername().then((nama) => {
      this.nama = nama;
    });
    this.userData.getId().then((value)=>{
      this.user_id = value;
      this.getAspirasi();
      this.getJualan();
    });
    this.userData.getProfilePict().then((value) => {
      this.profilePicture = value;
    });
  }

  editProfile(){
    this.nav.push(ProfileEditPage);
  }

  logout() {
    let param = JSON.stringify({ }); 
    this.authHttp.post(this.userData.BASE_URL+'user/logout',param).subscribe(res => {
      let response = res.json();
      console.log(response);
      if(response.status == 200) {
        this.userData.logout();
        this.app.getRootNav().setRoot(LoginPage);
      }
      this.showAlert(response.message);
    }, err => { console.log(err);
        this.showError(err);
    });
  }

  // Aspirasi
  getAspirasi() {
    this.authHttp.get(this.userData.BASE_URL+'aspirasi/get/user/'+this.user_id).subscribe(res => {
      let response = res.json();
      console.log(response.status)
      if(response.status == 200) {
        this.aspirasi = response.data;
      } else if(response.status == 204){
        this.aspirasi = [];
      }
    }, err => { console.log(err);
        this.showError(err);
    });
  }
  lihatPendukung(idAspirasi) {
     this.nav.push(PendukungPage,idAspirasi);
  }
  lihatTanggapan(aspirasi_id) {
     this.nav.push(TanggapanAspirasiPage,aspirasi_id);
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
    this.nav.push(EditAspirasiPage,dataAspirasi);
  }
  presentActionSheetAspirasi(dataAspirasi) {
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
  //End of aspirasi

  //Dagangan
  getJualan() {
    this.authHttp.get(this.userData.BASE_URL+'dagangan/get/user/'+this.user_id).subscribe(res => {
      let response = res.json();
      console.log(response);
      if(response.status == 200) {
        this.jualanku = response.data;
      } else if(response.status == 204){
        this.jualanku = [];
      }
    }, err => { console.log(err);
        this.showError(err);
    });
  }
  editJualan(dataDagangan){
    this.nav.push(EditJualKomoditasPage,dataDagangan);
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
  presentActionSheetDagangan(dataDagangan) {
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
  //End of dagangan

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
