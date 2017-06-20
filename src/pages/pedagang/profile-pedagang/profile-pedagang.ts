import { Component } from '@angular/core';
import { NavController, App,PopoverController, ToastController, ActionSheetController} from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { LoginPage } from '../../login/login';
import { ProfileEditPage } from '../../profile-edit/profile-edit';
import { PopoverPage } from '../../popover/popover';
import { AuthHttp } from 'angular2-jwt';
import { EditJualKomoditasPage } from '../../petani/edit-jual-komoditas/edit-jual-komoditas';
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
  public user_id:string;
	public profilePicture: string;
  public jualanku=[];
  constructor(
  	public navCtrl: NavController,
    public app: App,
  	public userData: UserData,
    public popoverCtrl: PopoverController,
    public authHttp: AuthHttp,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController
    ) {}

  ionViewWillEnter(){
    this.getName();
    this.getProfilePict();
    this.userData.getId().then((value) => {
      this.user_id = value;
      this.getJualan();
    });
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
