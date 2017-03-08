import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams, ToastController} from 'ionic-angular';
import { Http ,Headers,RequestOptions} from '@angular/http';
import { TambahAspirasiPage } from '../tambah-aspirasi/tambah-aspirasi';
import { PendukungPage } from '../pendukung/pendukung';
import { UserData } from '../../providers/user-data';
import 'rxjs/add/operator/map';

/*
  Generated class for the Coba page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-aspirasi',
  templateUrl: 'aspirasi.html'
})
export class AspirasiPage {
	public aspirasi: any;
  public limit = 0;
  public httpErr = false;
  public id: string;
  public token: string;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public http: Http,
    public actionSheetCtrl: ActionSheetController,
  	public toastCtrl: ToastController,
    public userData: UserData
  	) { }
  ionViewDidLoad(){}

  ionViewWillEnter() {
    this.userData.getId().then((value)=>{
      this.id = value;
    });

    console.log('ionViewDidLoad CobaPage');
    this.getData();
  }
  doRefresh(refresher) {
    setTimeout(() => {
      this.getData();
      refresher.complete();
    }, 1500);
  }
  getData() {
    
    this.userData.getToken().then((value) => {
      let headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value
      });
      this.token = value;
      let options = new RequestOptions({ headers: headers});
      
      this.http.get(this.userData.BASE_URL+'aspirasi/getAspirasi/'+this.id,options).subscribe(res => {
        let a = res.json();
        console.log(a);
        this.aspirasi = a.data;
        this.httpErr = false;
      }, err => { console.log(err);
          err.status==0? 
          this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
          this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
      });

      /*this.authHttp.get(this.userData.BASE_URL+'aspirasi/getAspirasi').subscribe(res => {
        let a = res.json();
        console.log(a);
        this.aspirasi = a.data;
        this.httpErr = false;
      }, err => { console.log(err);
          err.status==0? 
          this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
          this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
      });*/
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
  dukungAspirasi(aspirasi_id){
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'token': this.token
    });
    let options = new RequestOptions({ headers: headers});
     let param = JSON.stringify({
        us_id : this.id,
        aspirasi_id : aspirasi_id
      });

      this.http.post(this.userData.BASE_URL+'aspirasi/dukungAspirasi',param,options).subscribe(res => {
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
  batalDukungAspirasi(aspirasi_id){
    let headers = new Headers({ 
      'Content-Type': 'application/json',
      'token': this.token
    });
    let options = new RequestOptions({ headers: headers});
     let param = JSON.stringify({
        us_id : this.id,
        aspirasi_id : aspirasi_id
      });

      this.http.post(this.userData.BASE_URL+'aspirasi/batalDukung',param,options).subscribe(res => {
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
  tambahAspirasi() {
    this.navCtrl.push(TambahAspirasiPage);
  }
  lihatPendukung(idAspirasi) {
     this.navCtrl.push(PendukungPage,idAspirasi);
  }
  presentActionSheet(idAspirasi) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Hapus aspirasi',
          role: 'hapusAspirasi',
          handler: () => {
              let headers = new Headers({ 
                'Content-Type': 'application/json',
                'token': this.token
              });
              let options = new RequestOptions({ headers: headers});
               let param = JSON.stringify({
                  us_id : this.id,
                  aspirasi_id : idAspirasi
                });
               console.log(param);
              this.http.post(this.userData.BASE_URL+'aspirasi/delAspirasi',param,options).subscribe(res => {
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
        }
      ]
    });
    actionSheet.present();
  }

}