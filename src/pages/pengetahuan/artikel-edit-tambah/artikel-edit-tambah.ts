import { RestProvider } from './../../../providers/rest';
import { UserData } from './../../../providers/user-data';
import { AuthHttp } from 'angular2-jwt';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
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
  @ViewChild(Content) content: Content;

  private picture       : string;
  private pageType      : string;
  private artikelStatus : string;
  private form          : FormGroup;
  
  // form atribut
  private judul         : string;
  private ringkasan     : string;
  private contentEditor : string; //isi artikel
  private tag           : any = [];
  private status        : string;
  
  private meta          : {thumbnail?: string};
  private penulis       : string;
  private gambarSampul  : any;//thumbnail
  private tanggal       : {terbit?: any, ubah?: any} = {};

  constructor(public userData: UserData, 
              public authHttp: AuthHttp, 
              public rest: RestProvider,
              public formBuilder: FormBuilder, 
              public navCtrl: NavController, 
              public navParams: NavParams) {

    console.log('page', this.navParams.data.page)
    this.pageType = this.navParams.data.page;
    this.setForm();
  }
  setForm(){
    this.form = this.formBuilder.group({
      judul: ['', [Validators.required]],
      isi: ['', [Validators.required]],
      status: ['terbit', [Validators.required]],
      gambarSampul : [''],
      tag: [[]],

    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtikelEditTambahPage');
  }
  submit(){
    console.log('is form falid >', this.form.valid);
    console.log('isi form ', this.form.value);

    let claims = JSON.stringify({
      meta: {
        thumbnail: 'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png'
      },
      tanggal: {
        terbit: new Date,
        ubah: new Date
      },
      judul: this.form.get('judul').value,
      ringkasan: this.contentEditor.slice(0, 200), //get some char of string 
      isi: this.contentEditor,
      tag: this.form.get('tag').value.map(function(a) {return a.value}), // extract spesific value of property from array of object
      status: this.form.get('status').value

    });

    this.rest.post(this.userData.Base_URL_KMS+'api/artikel/post/tulis', claims)
    .subscribe(
      response =>{
        let data = response;
      },
      err =>{
        this.rest.showError(err);
      }
      
    )
  }

  htmlChanged(e){
    this.contentEditor = e;
    this.form.get('isi').setValue(this.contentEditor);
    console.log('isi content editor', this.contentEditor);
  }
  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
        console.log('imagedatanya', imageData)
        this.form.get('gambarSampul').setValue(imageData);
        this.picture = imageData
    	}, (err) => {
        alert(err)
    });
  }
  getPhotoFromGallery(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType     : Camera.PictureSourceType.PHOTOLIBRARY,
        targetWidth: 600,
        targetHeight: 600
    }).then((imageData) => {
        console.log('imagedatanya', imageData)      
        this.form.get('gambarSampul').setValue(imageData);
        this.picture = imageData
    	}, (err) => {
        alert(err)
    });
  } 
  setFocus(e, id){ // set focus input to ng 2 tag input. it is used because ng2 tag input was a component
    let yOffset = document.getElementById(id).offsetTop;
    console.log('offfsetnya', yOffset)
    this.content.scrollTo(0, yOffset)
    console.log('on focus', e)
  } 
  

}
