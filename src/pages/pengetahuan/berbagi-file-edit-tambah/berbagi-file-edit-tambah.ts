import { RestProvider } from './../../../providers/rest';
import { UserData } from './../../../providers/user-data';
import { SharedProvider } from './../../../providers/shared';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  
  private form          : FormGroup;

  private fileName      : string;
  private mimeType      : string;

  private _maxSizeMateri: number = 10 * Math.pow(1024, 2);


  constructor(public fileChooser: FileChooser, 
              public navCtrl: NavController,
              public file: File,
              public rest: RestProvider,
              public shared: SharedProvider, 
              public userData: UserData,
              public formBuilder: FormBuilder,
              public navParams: NavParams) {
    this.setForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerbagiFileEditTambahPage');
  }
  
  setForm(){
    this.form = this.formBuilder.group({
      judul: ['', [Validators.required]],
      deskripsi: ['', [Validators.required]],
      status: ['terbit', [Validators.required]],
      materi: ['', [Validators.required]], //recieve file base 64 format,
      typeMateri: [''],
      sizeMateri: ['']
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
    })
    console.log('form value ', this.form.value);
  }
}
