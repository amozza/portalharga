import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { UserData } from '../../../providers/user-data';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { FileChooser } from '@ionic-native/file-chooser';
//import { File } from '@ionic-native/file';
// import {File} from 'ionic-native';
import { NgForm } from '@angular/forms';

declare var cordova: any
/*
  Generated class for the TambahMateri page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-tambah-materi',
  templateUrl: 'tambah-materi.html'
})
export class TambahMateriPage {
	submitted: boolean = false;
	token:string;
	materi:{judul?: string, keterangan?: string} = {};
	uriFile:any;
  fileName:string;
  fileExtension="";
  loading:any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public authHttp: AuthHttp,
  	public http: Http,
  	public userData: UserData,
  	private transfer: Transfer,
    private fileChooser: FileChooser,
    private toastCtrl: ToastController,
    public loadCtrl: LoadingController
  	) {}																		

  ionViewWillEnter() {
    this.userData.getToken().then((value) => {
      this.token = "Bearer "+value;
    });
    
  }	
	chooseFile()
  {
      this.fileChooser.open()
      .then(uri => 
      {
				this.uriFile = uri;
        let temp = this.uriFile.split("/");
        let filename = temp[temp.length-1];
        this.fileName = filename.replace(/%20/g," ");
        let tempEx = filename.split(".");
        this.fileExtension = tempEx[tempEx.length-1];
      })
      .catch(e => this.showAlert(e));
  }
	submit(form: NgForm) {
    this.submitted = true;
    if(this.uriFile && this.fileExtension=='pdf'){
      if (form.valid) {
        this.loading = this.loadCtrl.create({
            content: 'Tunggu sebentar...'
        });
        this.loading.present();
        this.submitted = false;
        const fileTransfer: TransferObject = this.transfer.create();
    // regarding detailed description of this you cn just refere ionic 2 transfer plugin in official website
        let options1: FileUploadOptions = {
            fileKey: 'file',
            fileName: this.fileName,
            headers: {"Authorization":this.token},
            params: {"judul":this.materi.judul,"keterangan":this.materi.keterangan},
            chunkedMode : false
        }
        fileTransfer.upload(this.uriFile, this.userData.BASE_URL+'materi/add', options1)
	       .then((data) => {
            this.loading.dismiss()
            let responseData = JSON.parse(JSON.stringify(data));
            let response = responseData.response;
            let a = JSON.parse(response);
            this.showAlert(a.message);
            if(a.status==200) {
              this.navCtrl.popToRoot();
            }
	       }, (err) => {
           this.loading.dismiss()
	          alert("error"+JSON.stringify(err));
	      });
      }
    } else {
      this.showAlert("Silahkan pilih file pdf");
    }
  }
	
  showError(err: any){  
    err.status==0? 
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  showAlert(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
