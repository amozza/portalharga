import { Component } from '@angular/core';
import { NavController, NavParams , ToastController} from 'ionic-angular';
import { Http, Headers,RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { UserData } from '../../../providers/user-data';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { FileChooser } from '@ionic-native/file-chooser';
//import { File } from '@ionic-native/file';
import {File} from 'ionic-native';
import { NgForm } from '@angular/forms';

declare var cordova: any
/*
  Generated class for the TambahMateri page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tambah-materi',
  templateUrl: 'tambah-materi.html'
})
export class TambahMateriPage {
	submitted: boolean = false;
	token:string;
	materi:{judul?: string, keterangan?: string} = {};
	uriFile:any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public authHttp: AuthHttp,
  	public http: Http,
  	public userData: UserData,
  	private transfer: Transfer,
    private fileChooser: FileChooser,
    private toastCtrl: ToastController
  	) {}																		

  ionViewWillEnter() {
    this.userData.getToken().then((value) => {
      this.token = "Bearer "+value;
    });
  }				

  fileChange(event) {
    let fileList: FileList = event.target.files;
    console.log(fileList[0]);
    // if(fileList.length > 0) {
    //     let file: File = fileList[0];
    //     console.log(file);
    //     let formData:FormData = new FormData();
    //     formData.append('file', file, file.name);
    //     let headers = new Headers();
    //     headers.append('Accept', 'application/json');
    //     let options = new RequestOptions({ headers: headers });
    //     this.http.post(this.userData.BASE_URL+'materi/add', formData, options)
    //      .subscribe(res => {
	   //    let response = res.json();
	   //    console.log(response);
	   //  }, err => {
	   //  	console.log(err); 
	   //  });   
    // 	}
	}

	getFile(){
		File.listDir(cordova.file.applicationDirectory, '/').then(
		  (files) => {
		    // do something
		  }
		).catch(
		  (err) => {
		    // do something
		  }
		);
	}

	// getFile(){
	// 	this.file.checkDir(this.file.dataDirectory, 'mydir')
	// 		.then(_ => console.log('Directory exists'))
	// 		.catch(err => console.log('Directory doesnt exist'));
	// }
	chooseFile()
  {
      this.fileChooser.open()
      .then(uri => 
      {
				this.uriFile = uri;
      })
      .catch(e => this.showAlert(e));
  }
	submit(form: NgForm) {
    this.submitted = true;
    if(this.uriFile){
      if (form.valid) {
        this.submitted = false;
        let param = JSON.stringify({
          judul: this.materi.judul, 
          keterangan: this.materi.keterangan
        }); 
        this.authHttp.post(this.userData.BASE_URL+"materi/add",param).subscribe(data => {
          let response = data.json();
          if(response.status == 200) {
            this.uploadFile();
          } else {
            this.showAlert(response);
          }
        }, err => {
          this.navCtrl.popToRoot();
          this.showError(err);
        });
      }
    } else {
      this.showAlert("Silahkan pilih file pdf");
    }
  }
	uploadFile(){
		const fileTransfer: TransferObject = this.transfer.create();

    // regarding detailed description of this you cn just refere ionic 2 transfer plugin in official website
		let options1: FileUploadOptions = {
				fileKey: 'file',
				fileName: 'name.pdf',
				headers: {"Authorization":this.token},
				params: {},
				chunkedMode : false
		
		}
		fileTransfer.upload(this.uriFile, this.userData.BASE_URL+'materi/upload', options1)
	       .then((data) => {
	       	let responseData = JSON.parse(JSON.stringify(data));
           alert(responseData);
          let response = responseData.response;
          alert(response);
          if(response.status == 200) {
            alert("masuk status 200");
          } else {
            this.showAlert(response);
          }
	       
	       }, (err) => {
	       // error
	       alert("error"+JSON.stringify(err));
	      });
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
