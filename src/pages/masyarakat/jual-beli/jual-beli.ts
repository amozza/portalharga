import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { Http ,Headers,RequestOptions} from '@angular/http';
import { UserData } from '../../../providers/user-data';

/*
  Generated class for the JualBeli page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-jual-beli',
  templateUrl: 'jual-beli.html'
})
export class JualBeliPage {
  public jualan: any;
  public id: string;
  public token: string;
  public options: any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public userData: UserData,
  	public http: Http,
  	public toastCtrl: ToastController
  	) {}

  ionViewWillEnter() {
    this.getJualan();
  }
  getJualan() {
    this.userData.getToken().then((value) => {
      let headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value,
        'login_type' : '1'
      });
      this.token = value;
      this.options = new RequestOptions({ headers: headers});
      
      this.http.get(this.userData.BASE_URL+'jualan/getJualanKu/'+this.id,this.options).subscribe(res => {
        let a = res.json();
        if(a.status=200) {
        	this.jualan = a.data;
        }
        console.log(a);
      }, err => { console.log(err);
          this.showError(err);
      });
    });
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
