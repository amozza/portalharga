import { SharedProvider } from './../../../providers/shared';
import { RestProvider } from './../../../providers/rest';
import { UserData } from './../../../providers/user-data';
import { AuthHttp } from 'angular2-jwt';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController } from 'ionic-angular';
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


  private picture       : any;
  private fileName      : string;
  private mimeType      : string;

  constructor(public userData: UserData, 
              public authHttp: AuthHttp, 
              public rest: RestProvider,
              public shared: SharedProvider, 
              public loadingCtrl: LoadingController,
              public formBuilder: FormBuilder, 
              public navCtrl: NavController, 
              public navParams: NavParams) {

    console.log('page', this.navParams.data.page)
    this.pageType =  this.navParams.data.page;
    this.setForm();
  }
  setForm(){
    this.form = this.formBuilder.group({
      judul: ['', [Validators.required]],
      isi: ['', [Validators.required]],
      status: ['terbit', [Validators.required]],
      gambarSampul : ['',[Validators.required]],
      tag: [[]],

    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ArtikelEditTambahPage');
  }
  submit(){
    console.log('form value ', this.form.value);

    let claims = JSON.stringify({
      meta: {
        thumbnail: this.form.get('gambarSampul').value
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

    let loader = this.loadingCtrl.create({
      content: "Harap tunggu..."
    });
    loader.present();    

    this.rest.post(this.userData.Base_URL_KMS+'api/artikel/post/tulis', claims)
    .subscribe(
      response =>{
        loader.dismiss();
        this.navCtrl.pop();
        let data = response;
        this.shared.toast.showToast('berhasil Tambah Artikel');
      },
      err =>{
        loader.dismiss();
        alert(JSON.stringify(err))
      }
      
    )
  }

  // method for listen the change of html editor
  htmlChanged(e){
    this.contentEditor = e;
    this.form.get('isi').setValue(this.contentEditor);
    console.log('isi content editor', this.contentEditor);
  }

  takePictureFrom(){
    this.shared.ActionSheetTakePicture.takeFrom()
    .then(JSON.parse)
    .then(data =>{
      console.log('image uri ', data.imageUri);
      //if the image must be uploaded first
      if(data.statusUpload){
        let imageuri = data.imageUri;
        let sourceFileName = imageuri.substring(imageuri.lastIndexOf('/') + 1, imageuri.length);
        sourceFileName = sourceFileName.split('?').shift();
        //get the name
        this.fileName = sourceFileName;
        console.log('filename ', this.fileName);
        //upload picture
        this.uploadImage(data.imageUri);
      }
      else{
        this.picture = this.userData.Base_URL_KMS+'api/artikel/gambar/'+data.imageUri;
        this.form.get('gambarSampul').setValue(this.picture);    
      }
    })
    .catch(err=>{
        alert(err)
    })    
  }

  uploadImage(imageUri){
    let params = {
      "fileName": this.fileName || 'gambar.jpg',
      "mimeType": 'image/jpeg'
    }
    
    this.rest.upload.fileUpload(this.userData.Base_URL_KMS+'api/artikel/gambar/upload', imageUri, params)
    .then(JSON.parse)
    .then(res=>{
      // alert(res);
      this.shared.toast.showToast('Unggah gambar berhasil');
      // console.log('namaya file balikannya coy', data.nama)
      //view to picture;
      // this.picture=this.userData.Base_URL_KMS+'api/artikel/gambar/'+data.nama.sistem;
      this.form.get('gambarSampul').setValue(this.picture);
    })
  }
  setFocus(e, id){ // set focus input to ng 2 tag input. it is used because ng2 tag input was a component
    let yOffset = document.getElementById(id).offsetTop;
    console.log('offfsetnya', yOffset)
    this.content.scrollTo(0, yOffset)
    console.log('on focus', e)
  } 
  

}
