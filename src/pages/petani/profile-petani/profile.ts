import { Component } from '@angular/core';
import { NavController, AlertController, App ,ToastController, ActionSheetController, PopoverController, LoadingController} from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { LoginPage } from '../../login/login';
import { ProfileEditPage } from '../../profile-edit/profile-edit';
import { Storage } from '@ionic/storage';
import { AuthHttp } from 'angular2-jwt';
import { PendukungPage } from '../pendukung/pendukung';
import { PopoverPage } from '../../popover/popover';
import { EditAspirasiPage } from '../edit-aspirasi/edit-aspirasi';


/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePetaniPage {
	public nama: string;
  public profilePicture: string;
  public aspirasi: any;
  public id: string;
  public loading: any;
  
  constructor(
  	public alertCtrl: AlertController, 
  	public nav: NavController,
    public app: App,
    public authHttp: AuthHttp,
    public toastCtrl: ToastController,
    public storage: Storage,
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
  }
  getDataProfile() {
    this.userData.getUsername().then((nama) => {
      this.nama = nama;
    });
    this.userData.getId().then((value)=>{
      this.id = value;
      this.getAspirasi();
    });
    this.userData.getProfilePict().then((value) => {
      this.profilePicture = value;
    });
  }

  editProfile(){
    this.nav.push(ProfileEditPage);
  }

  logout() {
    this.userData.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }
  getAspirasi() {
    this.authHttp.get(this.userData.BASE_URL+'aspirasi/get/'+this.id).subscribe(res => {
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
  lihatPendukung(idAspirasi) {
     this.nav.push(PendukungPage,idAspirasi);
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
  showAlert(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
