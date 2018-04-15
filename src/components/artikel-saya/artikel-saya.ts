import { SharedProvider } from './../../providers/shared';
import { UserData } from './../../providers/user-data';
import { RestProvider } from './../../providers/rest';
import { ActionSheetController, PopoverController, AlertController, NavController, App } from 'ionic-angular';
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
  providers: [{
    provide: LOCALE_ID, useValue: "id" 
  }]
})
export class ArtikelSayaComponent {
  @Input('name') passedData : String;
  
  text            : string;
  data            : any = [];
  filterBy        : string; 
  sortBy          : string;
  
  //lazy load
  skipData        : number=0;
  limitData       : number=5; 
  infiniteScroll  : any;
  isScrollAble    : boolean=true;
  params1         : any;
  params2         : any;

  constructor(private navCtrl: NavController, 
              private app : App,
              private shared: SharedProvider,
              private rest: RestProvider,
              private userData: UserData,
              private alertCtrl : AlertController,
              private actionSheetCtrl: ActionSheetController, 
              private authhttp : AuthHttp) {

    console.log('artikel saya component fire');

    //set the params of lazy load
    this.params1 = JSON.stringify({"skip": this.skipData, "limit": this.limitData });
    this.params2 = JSON.stringify({"terbaru": -1, "terpopuler": 1});

  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('on init comopnent')
    console.log('data hasil lemparan', this.passedData)
    this.getAllArtikel();
  }
  changeFilter(value){
    console.log('filter yang di pilih', value)
  }
  getAllArtikel(){

    this.rest.get(this.userData.Base_URL_KMS+'api/artikel/post/all/'+this.params1+'/'+this.params2)
    .subscribe(response =>{
      this.data = response;
      console.log('Berhasil get artikel', this.data)
      console.log('pangjang datanya', this.data.length)
    }, err =>{
      console.log(err)
      this.rest.showError(err);
    });
  }


/**
 * 
 * Page function
 */

  doInfinite(infiniteScroll) {
    if(this.isScrollAble){
      this.infiniteScroll = infiniteScroll;
      this.skipData += this.limitData;
      let params1 = JSON.stringify({"skip": this.skipData, "limit": this.limitData });
      let params2 = JSON.stringify({"terbaru": -1, "terpopuler": 1})
      this.rest.get(this.userData.Base_URL_KMS+'api/artikel/post/all/'+params1+'/'+params2)
      .subscribe(
        res =>{
          if(res == null) // no content
            this.isScrollAble = false;
          else{
            this.data.push.apply(this.data, res);
            console.log('panjang data sekarang', this.data.length)
            this.infiniteScroll.complete();
          }
        },
        err=>{
          this.infiniteScroll.complete();
          this.rest.showError(err);
        }
      )
    }
  }

  deletePost(gossip) {
      this.shared.Alert.confirm().then((res) => {
          console.log('confirmed');
          console.log('minta di delete beneran')
      }, err => {
          console.log('user cancelled');
      })
  }  
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Hapus',
          role: 'destructive',          
          icon: 'trash',
          handler: () => {
            this.shared.Alert.confirm().then((res) => {
                console.log('confirmed');
                console.log('minta di delete beneran')
            }, err => {
                console.log('user cancelled');
            })            
            console.log('Hapus clicked');
          }
        },{
          text: 'Edit',
          icon: 'create',
          handler: () => {
            // this.app.getRootNav().push('ArtikelEditTambahPage', {page:'Edit'})
            console.log('Destructive clicked');
            this.shared.Alert.alert('pesan');
          }
        },{
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
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
    this.app.getRootNav().push('ArtikelPreviewPage', objectArtikel)
  }  
}
