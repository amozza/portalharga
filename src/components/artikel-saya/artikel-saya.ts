import { SharedProvider } from './../../providers/shared';
import { UserData } from './../../providers/user-data';
import { RestProvider } from './../../providers/rest';
import { ActionSheetController, PopoverController, AlertController, NavController, App, Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Component, Input, LOCALE_ID } from '@angular/core';


/**
 * Generated class for the ArtikelSayaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'artikel-saya',
  templateUrl: 'artikel-saya.html',
  providers: [ {provide: LOCALE_ID, useValue: "id"}]
})
export class ArtikelSayaComponent {
  @Input('name') passedData : String;
  @Input('data') datagan: Array<any>;

  private data            : any = [];
  private filterBy        : string; 
  private sortBy          : string;
  
  constructor(private navCtrl: NavController, 
              private app : App,
              private shared: SharedProvider,
              private rest: RestProvider,
              private userData: UserData,
              private event: Events,
              private alertCtrl : AlertController,
              private actionSheetCtrl: ActionSheetController, 
              private authhttp : AuthHttp) {

    console.log('artikel saya component fire');
  }
  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.

    //replace the newest input data
    this.data = this.datagan;
  }

  ngOnInit() {
    console.log('datagan ', this.datagan);
    console.log('data hasil lemparan', this.passedData);
  }

  changeFilter(value){
    console.log('filter yang di pilih', value)
  }


/**
 * 
 * Page function
 */


  deletePost(gossip) {
      this.shared.Alert.confirm().then((res) => {
          console.log('confirmed');
          console.log('minta di delete beneran')
      }, err => {
          console.log('user cancelled');
      })
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
  pushArtikelPreviewPage(params){
    let objectArtikel = params;
    this.app.getRootNav().push('ArtikelPreviewPage', {id:objectArtikel._id})
  }  
}
