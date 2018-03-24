import { ActionSheetController, App, PopoverController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the ArtikelSayaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'artikel-saya',
  templateUrl: 'artikel-saya.html'
})
export class ArtikelSayaComponent {
  @Input('name') passedData : String;
  text: string;
  length;
  data = [];
  selectOptions = {
    title: 'Filter Berdasarkan'
  };
  options1 = ['draf', 'terbit'];   
  filterBy; 
  sortBy;

  constructor(private app: App, 
              private alertCtrl : AlertController,
              private actionSheetCtrl: ActionSheetController, 
              private authhttp : Http) {
    console.log('Hello ArtikelSayaComponent Component');
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('data hasil lemparan', this.passedData)
    this.getAllArtikel();
  }

  changeFilter(value){
    console.log('filter yang di pilih', value)
  }
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  
  getAllArtikel(){
    this.authhttp.get('https://restcountries.eu/rest/v2/all')
    .subscribe(response =>{
      let data = response.json();
      this.data = data
      this.length = data.length;
      console.log('datanya coy', this.data)
      console.log('pangjang datanya', this.length)
    }, err =>{
      console.log('error boy', err)
    });
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Hapus',
          role: 'destructive',          
          icon: 'trash',
          handler: () => {
            this.showConfirm();
            console.log('Hapus clicked');
          }
        },{
          text: 'Edit',
          icon: 'create',
          handler: () => {
            this.app.getRootNav().push('ArtikelEditTambahPage', {page:'Edit'})
            console.log('Destructive clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }      
  pushArtikelPreviewPage(){
    this.app.getRootNav().push('ArtikelPreviewPage')
  }
  showConfirm(){
    let confirm = this.alertCtrl.create({
      title: 'Apakah anda yakin?',
      // message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
      buttons: [
        {
          text: 'Tidak',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  } 
}
