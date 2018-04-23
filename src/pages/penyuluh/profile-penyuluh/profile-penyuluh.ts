import { Component } from '@angular/core';
import { NavController, App, PopoverController, ToastController, LoadingController, ActionSheetController, IonicPage } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { LoginPage } from '../../login/login';
import { ProfileEditPage } from '../../profile-edit/profile-edit';
import { PopoverPage } from '../../popover/popover';
import { AuthHttp } from 'angular2-jwt';
// import { EditMateriPage } from "../edit-materi/edit-materi";
// import { ViewMateriPage } from "../view-materi/view-materi";
/*
  Generated class for the ProfilePenyuluh page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-profile-penyuluh',
  templateUrl: 'profile-penyuluh.html'
})
export class ProfilePenyuluhPage {
  public materi=[];
  public nama: string;
	public profilePicture: string;
  public user_id:number;
  public loading: any;
  constructor(
  	public navCtrl: NavController,
    public app: App,
  	public userData: UserData,
    public popoverCtrl: PopoverController,
    public authHttp: AuthHttp,
    public toastCtrl: ToastController,
    public loadCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController
    ) { }

  ionViewWillEnter(){
    this.getName();
    this.getProfilePict();
    this.userData.getId().then((value) =>{
      this.user_id = value;
      this.getMateri();
    });
  }
  getMateri(){
    this.authHttp.get(this.userData.BASE_URL+'materi/get/user/'+this.user_id).subscribe(res => {
      let response = res.json();
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
          text: 'Lihat materi',
          role: 'lihatMateri',
          handler: () => {
            // window.open(dataMateri.file);
            this.navCtrl.push('ViewMateriPage',dataMateri);
          }
        },
        {
          text: 'Edit materi',
          role: 'editFile',
          handler: () => {
            this.navCtrl.push('EditMateriPage',dataMateri);
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
