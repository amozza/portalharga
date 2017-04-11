import { Component } from '@angular/core';
import { NavController, App,PopoverController, ToastController} from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { LoginPage } from '../../login/login';
import { ProfileEditPage } from '../../profile-edit/profile-edit';
import { PopoverPage } from '../../popover/popover';
import { AuthHttp } from 'angular2-jwt';
/*
  Generated class for the ProfilePedagang page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile-pedagang',
  templateUrl: 'profile-pedagang.html'
})
export class ProfilePedagangPage {
	public nama: string;
	public profilePicture: string;
  constructor(
  	public navCtrl: NavController,
    public app: App,
  	public userData: UserData,
    public popoverCtrl: PopoverController,
    public authHttp: AuthHttp,
    public toastCtrl: ToastController
    ) {}

  ionViewWillEnter(){
    this.getName();
    this.getProfilePict();
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
