import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import { Http ,Headers,RequestOptions} from '@angular/http';
import { UserData } from '../../../providers/user-data';
import { NgForm } from '@angular/forms';
import {Camera} from 'ionic-native';

/*
  Generated class for the EditJualKomoditas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-jual-komoditas',
  templateUrl: 'edit-jual-komoditas.html'
})
export class EditJualKomoditasPage {

  submitted: boolean = false;
  id: string;
  produksi:{komoditas?: string, jumlah?: string, satuanHarga?: string, satuanJumlah?: string, harga?: string, foto?: string} = {};
  headers: any;
  options: any;
  jualan_id: string;

  constructor(
  	public navCtrl: NavController,
    public toastCtrl: ToastController, 
    public http: Http, 
  	public navParams: NavParams,
    public userData: UserData) {
    this.produksi.satuanHarga = 'Kg';
    this.produksi.satuanJumlah = 'Kg';
    let data = navParams.data;
    console.log(data);
    this.produksi.komoditas = data.komoditas;
    this.produksi.jumlah = data.stok;
    this.produksi.harga = data.harga;
    this.produksi.foto = 'https://ph.yippytech.com/'+data.foto_komoditas;
    this.jualan_id = data.jualan_id;
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

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
    	this.produksi.foto = 'data:image/jpeg;base64,'+imageData;
    	}, (err) => {
        console.log(err);
    });
  }
  getPhotoFromGallery(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType     : Camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
    	this.produksi.foto = 'data:image/jpeg;base64,'+imageData;
    	}, (err) => {
        console.log(err);
    });
  }

  submit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.submitted = false;
      let input = JSON.stringify({
        komoditas: this.produksi.komoditas,
        string64: this.produksi.foto,
        stok: this.produksi.jumlah+' '+this.produksi.satuanJumlah , 
        harga: this.produksi.harga+' per '+this.produksi.satuanHarga,
        us_id: this.id,
        jualan_id: this.jualan_id
      });
      this.http.post(this.userData.BASE_URL+"jualan/updateJualan",input,this.options).subscribe(data => {
         let response = data.json();
         if(response.status == '200') {
            this.navCtrl.popToRoot();
            this.showAlert("Komoditasmu telah berhasil dikirim");
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
