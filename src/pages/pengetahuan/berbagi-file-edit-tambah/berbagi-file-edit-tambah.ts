import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';

/**
 * Generated class for the BerbagiFileEditTambahPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-berbagi-file-edit-tambah',
  templateUrl: 'berbagi-file-edit-tambah.html',
})
export class BerbagiFileEditTambahPage {

  constructor(public fileChooser: FileChooser, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerbagiFileEditTambahPage');
  }
	chooseFile()
  {
      this.fileChooser.open()
      .then(uri => 
      {
        console.log('file choosed')
        alert('bisa coy')
				// this.uriFile = uri;
        // let temp = this.uriFile.split("/");
        // let filename = temp[temp.length-1];
        // this.fileName = filename.replace(/%20/g," ");
        // let tempEx = filename.split(".");
        // this.fileExtension = tempEx[tempEx.length-1];
      })
      .catch(e => alert(e));
  }
}
