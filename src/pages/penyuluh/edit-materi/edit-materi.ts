import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import { UserData } from '../../../providers/user-data';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { NgForm } from '@angular/forms';
import { AuthHttp } from 'angular2-jwt';
/*
  Generated class for the EditMateri page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-edit-materi',
  templateUrl: 'edit-materi.html'
})
export class EditMateriPage {
  submitted: boolean = false;
	token:string;
	materi:{id?: string,judul?: string, keterangan?: string} = {};
	uriFile:any;
  fileName:string;
  fileExtension="";
  loading:any;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public http: Http,
  	public userData: UserData,
    public authHttp: AuthHttp,
  	private transfer: Transfer,
    private fileChooser: FileChooser,
    private toastCtrl: ToastController,
    public loadCtrl: LoadingController
  	) {
      let data = navParams.data;
      this.materi.judul = data.judul;
      this.materi.keterangan = data.keterangan;
      this.materi.id = data.materi_id;
    }																		

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
  editWithFile(){
    if(this.fileExtension=='pdf'){
      this.loading.present();
      const fileTransfer: TransferObject = this.transfer.create();
    // regarding detailed description of this you cn just refere ionic 2 transfer plugin in official website
      let options1: FileUploadOptions = {
          fileKey: 'file',
          fileName: this.fileName,
          headers: {"Authorization":this.token},
          params: {
            "judul":this.materi.judul,
            "keterangan":this.materi.keterangan,
            "materi_id":this.materi.id
          },
          chunkedMode : false
      }
      fileTransfer.upload(this.uriFile, this.userData.BASE_URL+'materi/update', options1)
        .then((data) => {
          this.loading.dismiss()
          let responseData = JSON.parse(JSON.stringify(data));
          let response = responseData.response;
          let a = JSON.parse(response);
          this.showResponse(a);
        
        }, (err) => {
          this.loading.dismiss();
          this.showAlert("Error uploading file");
      });
    } else {
      this.showAlert("Silahkan pilih file pdf");
    }
  }
  editFormOnly(){
    let param = JSON.stringify({
      judul: this.materi.judul, 
      keterangan: this.materi.keterangan,
      materi_id: this.materi.id
    }); 
    this.authHttp.post(this.userData.BASE_URL+"materi/update",param).subscribe(data => {
      this.loading.dismiss();
      let response = data.json();
      this.showResponse(response);
    }, err => {
      this.loading.dismiss();
      this.showError(err);
    });
  }
  showResponse(response){
    if(response.status==200) {
      this.navCtrl.popToRoot();
      this.showAlert(response.message);
    } else {
      this.showAlert(response.message);
    }
  }
	submit(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.loading = this.loadCtrl.create({
          content: 'Tunggu sebentar...'
      });
      
      this.submitted = false;
      if(this.uriFile){
        this.editWithFile();
      } else {
        this.editFormOnly();
      }
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
