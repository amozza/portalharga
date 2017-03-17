import { Component } from '@angular/core';
import { NavController, AlertController, App ,ToastController} from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { LoginPage } from '../../login/login';
import { ProfileEditPage } from '../../profile-edit/profile-edit';
import { Storage } from '@ionic/storage';
import { Http ,Headers,RequestOptions} from '@angular/http';


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
	nama: string;
  profilePict: string;
  public aspirasi: any;
  public httpErr = false;
  public id: any;
  constructor(
  	public alertCtrl: AlertController, 
  	public nav: NavController,
    public app: App,
    public http: Http,
    public toastCtrl: ToastController,
    public storage: Storage, 
  	public userData: UserData) {

  }

  ngAfterViewInit() {
  }

  ionViewWillEnter(){
    this.getName();
    this.getProfilePict();
    this.getAspirasi();
  }
  getName() {
    this.userData.getUsername().then((nama) => {
      this.nama = nama;
    });
    this.userData.getId().then((value)=>{
      this.id = value;
    });
  }
  getProfilePict() {
    this.userData.getProfilePict().then((values) => {
      this.profilePict = "https://ph.yippytech.com/" + values;
    });
  }
  editProfile(){
    this.nav.push(ProfileEditPage);
  }

  logout() {
    this.userData.logout();
    this.app.getRootNav().setRoot(LoginPage);
   // this.nav.setRoot(LoginPage);
  }
  getAspirasi() {
    
    this.userData.getToken().then((value) => {
      let headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value,
        'login_type' : '1'
      });
      let options = new RequestOptions({ headers: headers});
      
      this.http.get(this.userData.BASE_URL+'aspirasi/getAspirasi/'+this.id,options).subscribe(res => {
        let a = res.json();
        console.log(a);
        this.aspirasi = a.data;
        this.httpErr = false;
      }, err => { console.log(err);
          err.status==0? 
          this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
          this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
      });

    });
  }

  showAlert(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
    this.httpErr = true;
  }

}
