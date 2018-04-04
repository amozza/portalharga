import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'


/**
 * Generated class for the ForumTambahPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forum-tambah',
  templateUrl: 'forum-tambah.html',
})
export class ForumTambahPage {
  private form        : FormGroup;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder
            ) {
    this.setForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForumTambahPage');
  }

  setForm(){
    this.form = this.formBuilder.group({
      judul: ['', [Validators.required]],
      pertanyaan: ['', [Validators.required]],
      gambar: ['']
    })
  }

  submit(){
    alert('submitted')
  }



}
