import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http ,Headers,RequestOptions} from '@angular/http';
import { UserData } from '../../../providers/user-data';

/*
  Generated class for the Pendukung page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pendukung',
  templateUrl: 'pendukung.html'
})
export class PendukungPage {
  public aspirasi_id: string;
  public token: string;
  public pendukung: any;
  public httpErr = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public userData: UserData,
    public toastCtrl: ToastController) {
  	this.aspirasi_id = navParams.data;
  }

  ionViewDidLoad() {
    
  }
  ionViewWillEnter(){
    console.log(this.aspirasi_id);
    this.getData();
  }

  getData() {
    
    this.userData.getToken().then((value) => {
      let headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value,
        'login_type' : '1'
      });
      this.token = value;
      let options = new RequestOptions({ headers: headers});
      
      this.http.get(this.userData.BASE_URL+'aspirasi/getPendukung/'+this.aspirasi_id,options).subscribe(res => {
        let a = res.json();
        console.log(a);
        this.pendukung = a.data_pendukung;
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
