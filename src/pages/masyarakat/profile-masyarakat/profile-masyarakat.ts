import { Component } from '@angular/core';
import { NavController, AlertController, App, PopoverController, ToastController, ActionSheetController} from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { LoginPage } from '../../login/login';
import { ProfileEditPage } from '../../profile-edit/profile-edit';
import { Storage } from '@ionic/storage';
import { PopoverPage } from '../../popover/popover';
import { AuthHttp } from 'angular2-jwt';
import { EditOperasiPasarPage } from '../edit-operasi-pasar/edit-operasi-pasar';
import { PendukungOperasiPasarPage } from '../pendukung-operasi-pasar/pendukung-operasi-pasar';
import { TanggapanOperasiPasarPage } from "../tanggapan-operasi-pasar/tanggapan-operasi-pasar";

/*
  Generated class for the ProfileMasyarakat page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile-masyarakat',
  templateUrl: 'profile-masyarakat.html'
})
export class ProfileMasyarakatPage {

  nama: string;
  profilePicture: string;
  dataOperasi:any ;
  user_id:any;

  constructor(
  	public alertCtrl: AlertController, 
  	public navCtrl: NavController,
    public app: App,
    public storage: Storage, 
  	public userData: UserData,
    public popoverCtrl: PopoverController,
    public authHttp: AuthHttp,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController
    ) {

  }

  ionViewWillEnter(){
    this.getName();
    this.getProfilePict();
    this.getOperasi();
  }
  getOperasi() {
    this.userData.getId().then((value)=>{
      this.user_id = value;
      this.authHttp.get(this.userData.BASE_URL+'operasiPasar/operasi/get/'+this.user_id).subscribe(res => {
        let response = res.json();
        if(response.status == 200) {
          this.dataOperasi = response.data;
        } else if(response.status == 204) {
          this.dataOperasi = [];
        }
      }, err => { console.log(err);
          this.showError(err);
      });
    });
    
  }
  hapusOperasiPasar(idOperasi){
    let param = JSON.stringify({
        operasiPasar_id : idOperasi
      });
    this.authHttp.post(this.userData.BASE_URL+'operasiPasar/delete',param).subscribe(res => {
      let response = res.json();
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
  
  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
  getName() {
    this.userData.getUsername().then((nama) => {
      this.nama = nama;
    });
  }
  getProfilePict() {
    this.userData.getProfilePict().then((values) => {
      this.profilePicture = values;
    });
  }
  editProfile(){
    this.navCtrl.push(ProfileEditPage);
  }
  lihatPendukung(idOperasi){
     this.navCtrl.push(PendukungOperasiPasarPage,idOperasi);
  }
  lihatTanggapan(idOperasi){
     this.navCtrl.push(TanggapanOperasiPasarPage,idOperasi);
  }

  logout() {
    let param = JSON.stringify({ }); 
    this.authHttp.post(this.userData.BASE_URL+'user/logout',param).subscribe(res => {
      let response = res.json();
      if(response.status == 200) {
        this.userData.logout();
        this.app.getRootNav().setRoot(LoginPage);
      }
      this.showAlert(response.message);
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
