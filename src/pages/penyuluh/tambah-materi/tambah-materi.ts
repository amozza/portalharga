import { Component } from '@angular/core';
import { NavController, NavParams , ToastController} from 'ionic-angular';
import { Http, Headers,RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { UserData } from '../../../providers/user-data';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { FileChooser } from '@ionic-native/file-chooser';
//import { File } from '@ionic-native/file';
import {File} from 'ionic-native';

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TambahMateriPage');
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
	uploadresume()
  	{
  		this.showAlert('clicked');
      this.fileChooser.open()
      .then(uri => 
      {
        alert(uri);
         const fileTransfer: TransferObject = this.transfer.create();
         this.showAlert('file chooser');

    // regarding detailed description of this you cn just refere ionic 2 transfer plugin in official website
	      let options1: FileUploadOptions = {
	         fileKey: 'image_upload_file',
	         fileName: 'name.pdf',
	         headers: {},
	         params: {"app_key":"Testappkey"},
	         chunkedMode : false
	      
	      }
	      this.http.post(this.userData.BASE_URL+'materi/add', uri)
         .subscribe(res => {
	      let response = res.json();
	      console.log(response);
	    }, err => {
	    	console.log(err); 
	    });   
	      fileTransfer.upload(uri, this.userData.BASE_URL+'materi/add', options1)
	       .then((data) => {
	       	this.showAlert(data);
	       // success 
	       alert("success"+JSON.stringify(data));
	       }, (err) => {
	       // error
	       alert("error"+JSON.stringify(err));
	           });

      })
      .catch(e => this.showAlert(e));
  }

  showAlert(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
