import { SharedProvider } from './../../../providers/shared';
import { RestProvider } from './../../../providers/rest';
import { UserData } from './../../../providers/user-data';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


/**
 * Generated class for the ForumTambahPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forum-edit-tambah',
  templateUrl: 'forum-edit-tambah.html',
})
export class ForumEditTambahPage {

  @ViewChild(Content) content: Content;

  private pageType      : string;
  private idSubKategori : string;
  private form          : FormGroup;
  private contentEditor : string;

  private dataEdit      : any;

  constructor(public navCtrl: NavController,
              public userData: UserData,
              public rest: RestProvider,
              public shared: SharedProvider,
              public loadingCtrl: LoadingController,
              public event: Events,
              public navParams: NavParams,
              private formBuilder: FormBuilder
            ) {
    this.pageType = this.navParams.data.pageType;
    this.idSubKategori = this.navParams.data.idSubKategori;
    console.log('pagetyp forum ', this.pageType);
    console.log('idsubkategori ', this.idSubKategori);

    if(this.pageType == 'Tambah'){
      this.setForm();
    }
    else{ //Edit
      this.dataEdit = this.navParams.data.data;
      console.log('data edit ', this.dataEdit);
      this.setEditForm();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumTambahPage');
  }

  submit(){
    console.log('isi form ', this.form.value);
    let claims = {
      judul: this.form.get('judul').value,
      isi : this.contentEditor,
      tag: this.form.get('tag').value.map(function(a) {return a.value}),
      status: this.form.get('status').value,
      subkategori: this.form.get('subkategori').value
    }

    console.log('claims submit ', claims)

    if(this.pageType == 'Tambah')
      this.submitPost(claims);
    else
      this.submitEdit(claims)
  }
  
/**
 * Tambah forum
 */
  setForm(){
    this.form = this.formBuilder.group({
      judul: ['', [Validators.required]],
      pertanyaan: ['', [Validators.required]],
      tag: ['', [Validators.required]],
      status: ['terbit', [Validators.required]],
      subkategori: [this.idSubKategori, [Validators.required]]
    })
  }
  submitPost(claims){
    let loader = this.loadingCtrl.create({
      content: "Harap tunggu..."
    });
    loader.present();
    
    let uri = this.userData.Base_URL_KMS+'api/diskusi/tanya/tulis';
    this.rest.post(uri, this.userData.token, JSON.stringify(claims))
    .subscribe(
      data =>{
        loader.dismiss();
        this.navCtrl.pop();        
        this.shared.toast.showToast('Berhasil menambah forum');
        console.log('Berhasil tambah forum');
        this.event.publish('forum:refresh')
      }, err =>{
        loader.dismiss();
        alert(JSON.stringify(err))
      }
    )
    
  }
  

/**
 * Edit forum
 */
  setEditForm(){
    this.contentEditor = this.dataEdit.isi;
    // set tag input form
    let tag = [];
    for (var i =0 ; i < this.dataEdit.tag.length; i++){
      tag[i] = {'value': this.dataEdit.tag[i], 'display': this.dataEdit.tag[i] };
    }    
    
    this.form = this.formBuilder.group({
      judul: [this.dataEdit.judul, [Validators.required]],
      pertanyaan: [this.contentEditor, [Validators.required]],
      tag: [tag, [Validators.required]],
      status: [this.dataEdit.status, [Validators.required]],
      subkategori: [this.idSubKategori, [Validators.required]]
    })    
  }
  submitEdit(claims){
    claims['id'] = this.dataEdit._id;  
    let loader = this.loadingCtrl.create({
      content: "Harap tunggu..."
    });
    loader.present();
    
    let uri = this.userData.Base_URL_KMS+'api/diskusi/tanya/ubah';
    
    this.rest.patch(uri, this.userData.token, JSON.stringify(claims))
    .subscribe(
      data =>{
        loader.dismiss();
        this.shared.toast.showToast('berhasil mengubah forum')
        console.log('berhasil mengubah forum');
        this.navCtrl.pop();
        this.event.publish('forum:refresh');
        this.event.publish('forum:preview:refresh');
      }, err =>{
        loader.dismiss();
        alert(JSON.stringify(err))
      }
    )

  }

/**
 * page function
 */
  setFocus(e, id){ // set focus input base on offset top
    let yOffset = document.getElementById(id).offsetTop;
    this.content.scrollTo(0, yOffset)
  }
  htmlChanged(e){
    this.contentEditor = e;
    this.form.get('pertanyaan').setValue(this.contentEditor);
    console.log('isi content editor', this.contentEditor);
  }



}
