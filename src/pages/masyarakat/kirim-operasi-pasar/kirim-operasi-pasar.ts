import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../../providers/user-data';


/*
  Generated class for the KirimOperasiPasar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-kirim-operasi-pasar',
  templateUrl: 'kirim-operasi-pasar.html'
})
export class KirimOperasiPasarPage {
  submitted: boolean = false;
  operasi:{pasar?: string, subject?: string, opini?: string} = {};
  options: any;
  us_id: any;
  constructor(public navCtrl: NavController, 
  	public http: Http, 
  	public toastCtrl: ToastController,
    public userData: UserData,
    public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad KirimOperasiPasarPage');
  }
  ionViewWillEnter(){
  	this.userData.getToken().then((value) => {
      let headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value,
        'login_type' : '1'
      });
      this.options = new RequestOptions({ headers: headers});
    });

    this.userData.getId().then((value) => {
      this.us_id = value;
    });
  }
  submit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.submitted = false;
      let input = JSON.stringify({
        subject: this.operasi.subject, 
        message: this.operasi.opini
      });
      this.http.post(this.userData.BASE_URL+"operasi-pasar/post",input,this.options).subscribe(data => {
         let response = data.json();
         if(response.status == '200') {
            this.navCtrl.popToRoot();
            this.showAlert("Opini kamu telah dikirim");
         }
         
      }, err => {
          this.navCtrl.popToRoot();
          this.showError(err);
        });
            
    }
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
