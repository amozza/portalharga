import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http ,Headers,RequestOptions} from '@angular/http';
import { ActionSheetController } from 'ionic-angular';
import { TambahAspirasiPage } from '../tambah-aspirasi/tambah-aspirasi';
import { UserData } from '../../providers/user-data';
import 'rxjs/add/operator/map';
/*
  Generated class for the Coba page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-aspirasi',
  templateUrl: 'aspirasi.html'
})
export class AspirasiPage {
	public aspirasi: any;
  public limit = 0;
  public httpErr = false;
  headers: any;
  options: any;

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public http: Http,
    public actionSheetCtrl: ActionSheetController,
  	public toastCtrl: ToastController,
    public userData: UserData
  	) {}
  ionViewDidLoad(){}

  ionViewWillEnter() {
    console.log('ionViewDidLoad CobaPage');
    this.userData.getToken().then((value) => {
      this.headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value
      });
      this.options = new RequestOptions({ headers: this.headers});
      console.log(this.headers);
      this.getData();
    });
  }
  doRefresh(refresher) {
    setTimeout(() => {
      this.getData();
      refresher.complete();
    }, 1500);
  }
  getData() {
    this.http.get(this.userData.BASE_URL+'aspirasi/getAspirasi',this.options).subscribe(res => {
      let a = res.json();
      console.log(a);
      this.aspirasi = a.data;
      this.httpErr = false;
    }, err => { console.log(err);
        err.status==0? 
        this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
        this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
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

  tambahAspirasi() {
    this.navCtrl.push(TambahAspirasiPage);
  }
}
