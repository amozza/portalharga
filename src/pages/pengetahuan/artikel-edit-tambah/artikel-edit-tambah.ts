import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms'
import { Camera } from 'ionic-native';

/**
 * Generated class for the ArtikelEditTambahPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-artikel-edit-tambah',
  templateUrl: 'artikel-edit-tambah.html',
})
export class ArtikelEditTambahPage {
  private pageType: string;
  private contentEditor: string;
  private artikelStatus: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log('page', this.navParams.data.page)
    this.pageType = this.navParams.data.page;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtikelEditTambahPage');
  }
  submit(){
    console.log('upload artikel')
    this.navCtrl.pop();
  }

  checkContent(){
    console.log('edotr content ', this.contentEditor);
  }
  
  htmlChanged(e){
    this.contentEditor = e
    console.log('isi content editor', this.contentEditor);
  }
  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
      alert('berhasil ambil gambar')
    	}, (err) => {
    });
  }
  getPhotoFromGallery(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType     : Camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
        alert('berhasil pilih gambar dari libary')
    	}, (err) => {
    });
  }  
  

}
