import { RestProvider } from './../../../providers/rest';
import { UserData } from './../../../providers/user-data';
import { SharedProvider } from './../../../providers/shared';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'
import { File, FileEntry, IFile } from '@ionic-native/file';


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
  
  private pageType      : string;
  private dataEdit      : any;
  private form          : FormGroup;

  private fileName      : string;
  private mimeType      : string;

  private _maxSizeMateri: number = 10 * Math.pow(1024, 2);


  constructor(public fileChooser: FileChooser, 
              public navCtrl: NavController,
              public event: Events,
              public file: File,
              public rest: RestProvider,
              public shared: SharedProvider, 
              public userData: UserData,
              public formBuilder: FormBuilder,
              public navParams: NavParams) {

    this.pageType =  this.navParams.data.page;

    if(this.pageType == 'Edit'){
      this.dataEdit = this.navParams.data.data;
      this.setEditForm();
      console.log('data lemparan yang akan di edit ', this.dataEdit);      
    }
    else              
      this.setForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerbagiFileEditTambahPage');
  }
  setEditForm(){
    this.fileName = this.dataEdit.nama.asli;
    this.form = this.formBuilder.group({
      judul: ['belum ada judulnya coy', [Validators.required]],
      deskripsi: ['Deskripsinya juga belom ada', [Validators.required]],
      status: ['terbit', [Validators.required]],
      materi: [''], //recieve file uri format, optional for edit
    })    
  }
  setForm(){
    this.form = this.formBuilder.group({
      judul: ['', [Validators.required]],
      deskripsi: ['', [Validators.required]],
      status: ['terbit', [Validators.required]],
      materi: ['', [Validators.required]], //recieve file uri format,
    })
  }

	chooseFile(){
      this.fileChooser.open()
      .then(uri => 
      {
        console.log('urinya ', uri)
        this.shared.readFile.getMetaFile(uri)
        .then(JSON.parse)
        .then(meta =>{
          // alert(meta)
          if(meta.size < this._maxSizeMateri && this.shared.isInArray(this.shared.fileAllow, meta.type)){
            //save the name and mimetype
            this.fileName = meta.name;
            this.mimeType = meta.type;

            //set uri file for form validation
            this.form.get('materi').setValue(uri);
          }
          else 
            this.shared.Alert.alert('File yang dipilih harus pdf/ppt')
          console.log('nama ', meta.name)
          console.log('size ', meta.size)
          console.log('type ', meta.type)
        })
        .catch(err =>{
          alert(err)
        })
      })
      .catch(e => alert( e));

  }

  submit(){
    if(this.form.get('materi').value)
      this.submitWithFIle();
    else
      this.submitFormOnly();
  }

  submitWithFIle(){
    console.log('submit with file fire')
    let params = {
      "status": this.form.get('status').value,
      "deskripsi": this.form.get('deskripsi').value,
      "judul": this.form.get('judul').value,
      "meta": {"thumbnail": "http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png"},
      "fileName": this.fileName,
      "mimeType": this.mimeType
    }
    let imageUri = this.form.get('materi').value;
    this.rest.upload.fileUpload(encodeURI(this.userData.Base_URL_KMS+'api/materi/file/upload'), imageUri, params)
    .then(res =>{
      this.navCtrl.pop();
      this.shared.toast.showToast('Berhasil menambah file materi');
      this.event.publish('file:refresh');
    })
    console.log('form value ', this.form.value);
  }
  submitFormOnly(){
    console.log('submit with form only fire')
  }

}
