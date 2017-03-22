import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController} from 'ionic-angular';
import { Http ,Headers,RequestOptions} from '@angular/http';
import { UserData } from '../../../providers/user-data';
import { TambahJualKomoditasPage } from '../tambah-jual-komoditas/tambah-jual-komoditas';

/*
  Generated class for the JualKomoditas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-jual-komoditas',
  templateUrl: 'jual-komoditas.html'
})
export class JualKomoditasPage {
  public jualanku: any;
  public httpErr = false;
  public id: string;
  public token: string;
  public options: any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public userData: UserData,
  	public http: Http,
  	public actionSheetCtrl: ActionSheetController,
  	public toastCtrl: ToastController) {}

  ionViewWillEnter() {
    this.userData.getId().then((value)=>{
      this.id = value;
    });
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
        console.log(a);
        this.jualanku = a.data;
        this.httpErr = false;
      }, err => { console.log(err);
          this.showError(err);
      });
    });
  }
  tambahJualan(){
  	this.navCtrl.push(TambahJualKomoditasPage);
  }
  presentActionSheet(idJualan) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Edit Penjualan',
          role: 'editpenjualan',
          handler: () => {
               let param = JSON.stringify({
                  us_id : this.id,
                  jualan_id : idJualan
                });
              this.http.post(this.userData.BASE_URL+'jualan/delJualan',param,this.options).subscribe(res => {
                let a = res.json();
                console.log(a);
                if(a.status == '200') {
                  this.getJualan();
                  this.showAlert(a.message);
                }
              }, err => { 
                this.showError(err);
              });
          }
        },
        {
          text: 'Hapus Penjualan',
          role: 'hapuspenjualan',
          handler: () => {
               let param = JSON.stringify({
                  us_id : this.id,
                  jualan_id : idJualan
                });
              this.http.post(this.userData.BASE_URL+'jualan/delJualan',param,this.options).subscribe(res => {
                let a = res.json();
                console.log(a);
                if(a.status == '200') {
                  this.getJualan();
                  this.showAlert(a.message);
                }
              }, err => { 
                console.log(err);
                this.showError(err);
              });
          }
        }
      ]
    });
    actionSheet.present();
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
    this.httpErr = true;
  }

}
