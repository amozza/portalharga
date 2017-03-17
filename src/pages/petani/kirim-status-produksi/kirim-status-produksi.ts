import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Http,Headers,RequestOptions } from '@angular/http';
import { UserData } from '../../../providers/user-data';

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
  id: string;
  produksi:{komoditas?: string, lokasi?: string, jumlah?: string, satuan?: string, keterangan?: string} = {};
  headers: any;
  options: any;

  constructor(
  	public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public http: Http, 
  	public navParams: NavParams,
    public userData: UserData) {
    this.produksi.satuan = 'Kg';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KirimStatusProduksiPage');
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
        komoditas: this.produksi.komoditas,
        lokasi: this.produksi.lokasi,
        jumlah_produksi: this.produksi.jumlah+' '+this.produksi.satuan, 
        keterangan: this.produksi.keterangan,
        us_id: this.id
      });
      this.http.post(this.userData.BASE_URL+"produksi/postProduksi",input,this.options).subscribe(data => {
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
