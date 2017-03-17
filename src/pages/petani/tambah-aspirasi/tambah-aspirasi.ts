import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../../providers/user-data';

/*
  Generated class for the TambahAspirasi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tambah-aspirasi',
  templateUrl: 'tambah-aspirasi.html'
})
export class TambahAspirasiPage {

  submitted: boolean = false;
  aspirasi:{pasar?: string, subject?: string, message?: string} = {};
  headers: any;
  options: any;
  id: any;
  constructor(
  	public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public http: Http,
  	public navParams: NavParams,
    public userData: UserData) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TambahAspirasiPage');
    this.userData.getToken().then((value) => {
      this.headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value,
        'login_type' : '1'
      });
      this.options = new RequestOptions({ headers: this.headers});
    });

    this.userData.getId().then((value) => {
      this.id = value;
    });
  }

  submit(form: NgForm) {
    this.submitted = true;
   if (form.valid) {
      this.submitted = false;
      let input = JSON.stringify({
        subjek: this.aspirasi.subject, 
        isi_aspirasi: this.aspirasi.message,
        us_id : this.id
      });
      console.log(input);
      this.http.post(this.userData.BASE_URL+"aspirasi/postAspirasi",input,this.options).subscribe(data => {
         let response = data.json();
         console.log(response);
         if(response.status == '200') {
            this.navCtrl.popToRoot();
            this.showAlert("Aspirasi kamu telah dikirim");
         } else {
           this.showAlert(response);
         }
         
      }, err => {
        this.navCtrl.popToRoot();
        err.status==0? 
        this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
        this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
        });
            
    }
  }
  showAlert(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
