import { RestProvider } from './../../../providers/rest';
import { UserData } from './../../../providers/user-data';
import { SharedProvider } from './../../../providers/shared';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, Content, LoadingController } from 'ionic-angular';
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
  @ViewChild(Content) content: Content;

  private pageType      : string;
  private dataEdit      : any;
  private form          : FormGroup;
  private kategoris     : any = [];  

  private fileName      : any = [];
  private namaFile      : string;

  //for upload file
  private mimeType      : string;

  //for size validation
  private _maxSizeMateri: number = 10 * Math.pow(1024, 2);


  constructor(public fileChooser: FileChooser, 
              public navCtrl: NavController,
              public loadingCtrl: LoadingController,
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
    this.getCategory();
  }
  submit(){
    let claims = {
      meta: {
        thumbnail: "http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png"
      },
      judul: this.form.get('judul').value,
      deskripsi: this.form.get('deskripsi').value,
      subkategori: this.form.get('subKategori').value,
      materi: this.form.get('materi').value,
      tag: this.form.get('tag').value.map(function(a) {return a.value}),
      status: this.form.get('status').value
    }

    console.log('submitted claims: ', claims);
    if(this.pageType == 'Tambah')
      this.submitPost(claims);
    else
      this.submitEdit(claims);
  }
/**
 * tambah
 */
  setForm(){
    this.form = this.formBuilder.group({
      judul: ['', [Validators.required]],
      deskripsi: ['', [Validators.required]],
      status: ['terbit', [Validators.required]],
      materi: [[], [Validators.required]],
      tag: [[]],
      subKategori: ['', [Validators.required]]
    })
  }
  submitPost(claims){
    let loader = this.loadingCtrl.create({
      content: "Harap tunggu..."
    });
    loader.present();

    this.rest.post(this.userData.Base_URL_KMS+'api/materi/topik/tulis', this.userData.token, JSON.stringify(claims))
    .subscribe(
      response =>{
        loader.dismiss();
        this.navCtrl.pop();
        let data = response;
        this.shared.toast.showToast('Berhasil tambah tambah materi');
        this.event.publish('materi:refresh');
      },
      err =>{
        loader.dismiss();
        alert(JSON.stringify(err))
      }
    )    
  }

/**
 * edit
 */
  setEditForm(){
    //set the tag input
    let tag = [];
    for (var i =0 ; i < this.dataEdit.tag.length; i++){
      tag[i] = {'value': this.dataEdit.tag[i], 'display': this.dataEdit.tag[i] };
    }    

    //set the list of filename
    this.fileName = this.dataEdit.materi;

    this.form = this.formBuilder.group({
      judul: [this.dataEdit.judul, [Validators.required]],
      deskripsi: [this.dataEdit.deskripsi, [Validators.required]],
      status: [this.dataEdit.status, [Validators.required]],
      materi: [this.fileName, [Validators.required]],
      tag: [tag],
      subKategori: [this.dataEdit.subkategori._id, [Validators.required]]
    })   
  }
  submitEdit(claims){
    claims['id'] = this.dataEdit._id
    console.log('id added ', claims);

    let loader = this.loadingCtrl.create({
      content: "Harap tunggu..."
    });
    loader.present();

    this.rest.patch(this.userData.Base_URL_KMS+'api/materi/topik/ubah', this.userData.token, JSON.stringify(claims))
    .subscribe(
      response =>{
        loader.dismiss();
        this.navCtrl.pop();
        let data = response;
        this.shared.toast.showToast('Berhasil mengubah materi');
        this.event.publish('materi:refresh');
        this.event.publish('materi:preview:refresh');
      },
      err =>{
        loader.dismiss();
        alert(JSON.stringify(err))
      }
    )    
  }
/**
 * file function
 */
  takeFileFrom(){
    this.shared.ActionSheetTakeFile.takeFrom()
    .then(JSON.parse)
    .then(
      data =>{
        //if the image must be uploaded first
        if(data.statusUpload){
          let fileuri = data.fileUri;
          let sourceFileName = fileuri.substring(fileuri.lastIndexOf('/') + 1, fileuri.length);
          sourceFileName = sourceFileName.split('?').shift();
          console.log('nama filenya ', sourceFileName)
          //pilih filenya
          this.chooseFile(fileuri);
        }
        else{
          this.fileName.push(data.data);
          console.log('list filename ', this.fileName)
          // set to form
          this.setFileToForm();
        }
      }
    ).catch( err =>{
      alert(err)
    })
  }
	chooseFile(fileUri){ // function to get meta file
    this.shared.readFile.getMetaFile(fileUri)
    .then(JSON.parse)
    .then(meta =>{
      //validataion file
      if(meta.size < this._maxSizeMateri && this.shared.isInArray(this.shared.fileAllow, meta.type)){
        //save the mimetype dan nama file
        this.mimeType = meta.type;
        this.namaFile = meta.name;
        console.log('nama file yang akan di upload', this.namaFile);
        //upload file
        this.uploadFile(fileUri);
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
  }


  /**
   * api
   */

  uploadFile(fileUri){
    console.log('file uri nya ', fileUri);
    console.log('upload file fire')
    let params = {
      "fileName": this.namaFile ,
      "mimeType": this.mimeType,
      "token": this.userData.token
    }

    this.rest.upload.fileUpload(encodeURI(this.userData.Base_URL_KMS+'api/lampiran/file/upload'), fileUri, params)
    .then(JSON.parse)
    .then(res =>{
      console.log(JSON.stringify(res.data));
      this.shared.toast.showToast('Berhasil upload file');
      // set to form
      this.fileName.push(res.data);
      this.setFileToForm();
    })
  }
  
  getCategory(){
    let uri = this.userData.Base_URL_KMS+'api/kategorisasi/kategori/all/{"skip":0,"limit":null,"subkategori":1}/{"terbaru":1}'
    this.rest.get(uri, this.userData.token)
    .subscribe(
      res =>{
        console.log('berhasil get kategori ', res)
        this.kategoris = res;
      },
      err =>{
        alert('gagal get category')
      }
    )
  }  
  
/**
 * page function
 */

  popFile(index){
    //remove 1 element from array
    this.fileName.splice(index, 1);
  }
  cek(){
    console.log('data materinya ', this.form.get('materi').value);
    console.log('filename yang di tampilin di depan ', this.fileName);
    alert(JSON.stringify(this.form.value));
  }
  setFocus(e, id){ // set focus input base on offset top
    let yOffset = document.getElementById(id).offsetTop;
    this.content.scrollTo(0, yOffset)
  }
  setFileToForm(){
    this.form.get('materi').setValue(this.fileName)
  }
}
