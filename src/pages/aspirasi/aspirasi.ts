import { Component } from '@angular/core';
import { NavController, ActionSheetController, NavParams, ToastController, PopoverController } from 'ionic-angular';
import { Http ,Headers,RequestOptions} from '@angular/http';
import { StatusBar } from 'ionic-native';
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
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public http: Http,
    public actionSheetCtrl: ActionSheetController,
  	public toastCtrl: ToastController,
    public userData: UserData
  	) {}
  ionViewDidLoad(){}

  ionViewWillEnter() {
    StatusBar.overlaysWebView(false); // let status bar overlay webview
    StatusBar.backgroundColorByHexString('#ffffff'); // set status bar to white

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
    console.log(this.id);
    this.userData.getToken().then((value) => {
      let headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value
      });
      let options = new RequestOptions({ headers: headers});
      
      this.http.get(this.userData.BASE_URL+'aspirasi/getAspirasi',options).subscribe(res => {
        let a = res.json();
        console.log(a);
        this.aspirasi = a.data;
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

  tambahAspirasi() {
    this.navCtrl.push(TambahAspirasiPage);
  }
  lihatPendukung(idAspirasi) {
     this.navCtrl.push(PendukungPage,idAspirasi);
     console.log(idAspirasi);
  }
  presentActionSheet(idAspirasi) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Hapus aspirasi',
          role: 'hapusAspirasi',
          handler: () => {
            console.log('Tulis Artikel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}

