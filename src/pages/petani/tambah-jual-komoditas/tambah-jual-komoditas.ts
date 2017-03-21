import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { Http ,Headers,RequestOptions} from '@angular/http';
import { UserData } from '../../../providers/user-data';
import { NgForm } from '@angular/forms';

/*
  Generated class for the TambahJualKomoditas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tambah-jual-komoditas',
  templateUrl: 'tambah-jual-komoditas.html'
})
export class TambahJualKomoditasPage {
  submitted: boolean = false;
  id: string;
  produksi:{komoditas?: string, jumlah?: string, satuanHarga?: string, satuanJumlah?: string, harga?: string, gambar?: string} = {};
  headers: any;2
  options: any;

  constructor(
  	public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public http: Http, 
  	public navParams: NavParams,
    public userData: UserData) {
    this.produksi.satuanHarga = 'Kg';
    this.produksi.satuanJumlah = 'Kg';
  }
  ionViewWillEnter() {
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
        string64: this.produksi.gambar,
        stok: this.produksi.jumlah, 
        harga: this.produksi.harga+' '+this.produksi.satuanHarga,
        us_id: this.id
      });
      this.http.post(this.userData.BASE_URL+"jualan/postJualan",input,this.options).subscribe(data => {
         let response = data.json();
         if(response.status == '200') {
            this.navCtrl.popToRoot();
            this.showAlert("Status produksi kamu telah dikirim");
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
