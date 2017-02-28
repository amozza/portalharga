import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Http,Headers,RequestOptions } from '@angular/http';

/*
  Generated class for the OperasiPasar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-operasi-pasar',
  templateUrl: 'operasi-pasar.html'
})
export class OperasiPasarPage {

  submitted: boolean = false;
  operasi:{pasar?: string, subject?: string, opini?: string} = {};
  headers = new Headers({ 'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});

  constructor(
  	public navCtrl: NavController,
  	public http: Http, 
  	public toastCtrl: ToastController,
  	public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OperasiPasarPage');
  }

  submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.submitted = false;
      let input = JSON.stringify({
        subject: this.operasi.subject, 
        message: this.operasi.opini
      });
      this.http.post("http://punyanpan.net:5000/operasi-pasar",input,this.options).subscribe(data => {
         let response = data.json();
         if(response.status == '200') {
            this.navCtrl.popToRoot();
            this.showAlert("Opini kamu telah dikirim");
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
