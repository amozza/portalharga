import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController} from 'ionic-angular';
import { KirimStatusProduksiPage } from '../kirim-status-produksi/kirim-status-produksi';
import { Http ,Headers,RequestOptions} from '@angular/http';
import { UserData } from '../../providers/user-data';

/*
  Generated class for the StatusProduksi page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-status-produksi',
  templateUrl: 'status-produksi.html'
})
export class StatusProduksiPage {

  public produksi:any ;
  public token: string;
  public httpErr: any;
  public id: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userData: UserData,
    public http: Http,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusProduksiPage');
  }

  ionViewWillEnter() {
    this.userData.getId().then((value)=>{
      this.id = value;
    });
    this.getData();
  }

  getData() {
    console.log(this.id);
    this.userData.getToken().then((value) => {
      let headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value
      });
      this.token = value;
      let options = new RequestOptions({ headers: headers});
      
      this.http.get(this.userData.BASE_URL+'produksi/getProduksi/'+this.id,options).subscribe(res => {
        let a = res.json();
        console.log(a);
        this.produksi = a.data;
        this.httpErr = false;
      }, err => { console.log(err);
          err.status==0? 
          this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
          this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
      });
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

  tambahProduksi(){
  	this.navCtrl.push(KirimStatusProduksiPage);
  }

  presentActionSheet(idProduksi) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Hapus Produksi',
          role: 'hapusProduksi',
          handler: () => {
              let headers = new Headers({ 
                'Content-Type': 'application/json',
                'token': this.token
              });
              let options = new RequestOptions({ headers: headers});
               let param = JSON.stringify({
                  us_id : this.id,
                  produksi_id : idProduksi
                });
               console.log(param);
              this.http.post(this.userData.BASE_URL+'produksi/delProduksi',param,options).subscribe(res => {
                let a = res.json();
                console.log(a);
                if(a.status == '200') {
                  this.getData();
                  this.showAlert(a.message);
                }
              }, err => { 
                  err.status==0? 
                  this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
                  err.status==403?
                  this.showAlert(err.message):
                  this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
              });
          }
        },
        {
          text: 'Edit Produksi',
          role: 'editProduksi',
          handler: () => {
              
          }
        }
      ]
    });
    actionSheet.present();
  }

}
