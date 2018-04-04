import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'

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
  private uriFile       : any;
  private fileName      : string;
  private fileExtension : String;

  constructor(public fileChooser: FileChooser, 
              public navCtrl: NavController,
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
      materi: ['']
    })
  }

	chooseFile()
  {
      this.fileChooser.open()
      .then(uri => 
      {
        //set the file materi value
        this.form.get('materi').setValue(uri)
        console.log('urinya ', uri)
				this.uriFile = uri;
        let temp = this.uriFile.split("/");
        
        //set the judul value
        let filename = temp[temp.length-1];
        this.form.get('judul').setValue(filename);
        console.log('nama file ', filename )
        this.fileName = filename.replace(/%20/g," ");
        let tempEx = filename.split(".");
        this.fileExtension = tempEx[tempEx.length-1];
        console.log('extensionnya ', this.fileExtension)
      })
      .catch(e => alert(e));
  }

  submit(){
    console.log('form value ', this.form.value);
  }
}
