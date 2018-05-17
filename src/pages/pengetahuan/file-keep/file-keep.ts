import { UserData } from './../../../providers/user-data';
import { RestProvider } from './../../../providers/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FileKeepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-file-keep',
  templateUrl: 'file-keep.html',
})
export class FileKeepPage {
  private files           : any = [];
  private file            : any;

  constructor(public navCtrl: NavController, 
              public view: ViewController,
              public rest: RestProvider,
              public userData: UserData,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FileKeepPage');
    this.getUploadedFile();
  }
  closeModal(){
    this.view.dismiss();
  }
  getUploadedFile(){
    let uri = this.userData.Base_URL_KMS+'api/lampiran/file/saya/{"skip": 0, "limit": null, "jenis":"materi"}'

    this.rest.get(uri, this.userData.token)
    .subscribe(
      data =>{
        this.files = data;
      }, err =>{
        alert(JSON.stringify(err))
      }
    )
  }
  submit(){
    console.log('yang dari apps ', this.file)
    this.view.dismiss(this.file);
  }
}
