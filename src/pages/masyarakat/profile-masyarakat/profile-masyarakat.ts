import { Component } from '@angular/core';
import { NavController, AlertController, App, PopoverController, ToastController } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { LoginPage } from '../../login/login';
import { ProfileEditPage } from '../../profile-edit/profile-edit';
import { Storage } from '@ionic/storage';
import { PopoverPage } from '../../popover/popover';
import { Http,Headers,RequestOptions } from '@angular/http';

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
  profilePict: string;
  dataOperasi:any ;
  options:any;
  us_id:any;

  constructor(
  	public alertCtrl: AlertController, 
  	public nav: NavController,
    public app: App,
    public storage: Storage, 
  	public userData: UserData,
    public popoverCtrl: PopoverController,
    public http: Http,
    public toastCtrl: ToastController
    ) {

  }

  ngAfterViewInit() {
  }

  ionViewWillEnter(){
    this.getName();
    this.getProfilePict();
    this.userData.getId().then((value)=>{
      this.us_id = value;
    });
    this.getOperasi();
  }
  getOperasi() {
    this.userData.getToken().then((value) => {
      let headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value,
        'login_type' : '1'
      });
      this.options = new RequestOptions({ headers: headers});
      
      this.http.get(this.userData.BASE_URL+'masyarakat/operasiku/'+this.us_id,this.options).subscribe(res => {
        let a = res.json();
        console.log(a);
        this.dataOperasi = a.data;
      }, err => { console.log(err);
          this.showError(err);
      });
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
      this.profilePict = values;
    });
  }
  editProfile(){
    this.nav.push(ProfileEditPage);
  }

  logout() {
    this.userData.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }
  showError(err: any){  
    err.status==0? 
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    err.status==403?
    this.showAlert(err.message):
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
