import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Http,Headers,RequestOptions } from '@angular/http';

/*
  Generated class for the KirimStatusProduksi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-kirim-status-produksi',
  templateUrl: 'kirim-status-produksi.html'
})
export class KirimStatusProduksiPage {
  
  submitted: boolean = false;
  produksi:{komoditas?: string, lokasi?: string, jumlah?: string, keterangan?: string} = {};
  headers = new Headers({ 'Content-Type': 'application/json'});
  options = new RequestOptions({ headers: this.headers});

  constructor(
  	public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public http: Http, 
  	public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad KirimStatusProduksiPage');
  }

  submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.submitted = false;
      let input = JSON.stringify({
        komoditas: this.produksi.komoditas,
        lokasi: this.produksi.lokasi,
        jumlah: this.produksi.jumlah, 
        keterangan: this.produksi.keterangan
      });
      this.http.post("http://punyanpan.net:5000/status-produksi",input,this.options).subscribe(data => {
         let response = data.json();
         if(response.status == '200') {
            this.navCtrl.popToRoot();
            this.showAlert("Status produksi kamu telah dikirim");
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
