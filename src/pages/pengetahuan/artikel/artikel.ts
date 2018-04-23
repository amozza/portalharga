import { UserData } from './../../../providers/user-data';
import { RestProvider } from './../../../providers/rest';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events, App } from 'ionic-angular';


/**
 * Generated class for the ArtikelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-artikel',
  templateUrl: 'artikel.html',
  providers: []
})
export class ArtikelPage {

  @ViewChild(Content) content:Content;

  private userRole      : any;
  private dataExplore   : any = [];
  private dataFavorite  : any = [];
  private dataSaya      : any = [];

  private segment       : String='explore';
  private badge         : number = 1000;

  // params api request
  private params1       : any;
  private params2       : any;
  
  //lazy load data request
  private skipData      : number = 0;
  private limitData     : number = null;   

  constructor(public navCtrl: NavController, 
              public app: App,
              public event: Events,
              public userData: UserData,
              public rest: RestProvider,
              public navParams: NavParams) {
    //get role
    this.userData.getRole()
    .then(val =>{
      this.userRole = val;
      console.log('get role penyuluh 3 ? ', this.userRole);
    }) 
    //set the params of lazy load
    this.params1 = JSON.stringify({"skip": this.skipData, "limit": this.limitData });
    this.params2 = JSON.stringify({"terbaru": -1, "terpopuler": 1});
    
    //listen the change event
    this.event.subscribe('artikel:refresh', ()=>{
      if(this.userRole==3)
        this.getArtikelSaya();
      this.getArtikels();
      this.getArtikelFavorite();
    })
  }

  ionViewWillEnter(){
    //get role
    this.userData.getRole()
    .then(val =>{
      this.userRole = val;
      console.log('get role penyuluh 3 ? ', this.userRole);
      console.log('typopf ', typeof(this.userRole));
    })     
    console.log('will enter artikel')
  }
  ionViewDidEnter(){
    console.log('did enter artikel');
  }
  ionViewDidLoad() { //fire once
    console.log('ionViewDidLoad ArtikelPage');
    this.getArtikels(); //segment default is explore, then at the first time we need suplay view for artikel explore
  }
  selectedSegment(value){
    console.log('segment yang dipilih ', value);
    this.segment = value;

    //req api
    if(this.segment == 'explore' && this.dataExplore.length == 0)
      this.getArtikels();
    if(this.segment == 'saya' && this.dataSaya.length == 0)
      this.getArtikelSaya(); 
    else if(this.segment =='favorite' && this.dataFavorite.length == 0)
      this.getArtikelFavorite();      
  }
  /**
   * API
   */
  getArtikels(){
    this.rest.get(this.userData.Base_URL_KMS+'api/artikel/post/all/'+this.params1+'/'+this.params2, this.userData.token)
    .subscribe(response =>{ //already mapped in provider
      this.dataExplore = response;
      console.log('Berhasil get artikel explore ', this.dataExplore)
    }, err =>{
      console.log(err)
      this.rest.showError(err);
    });
  }
  getArtikelSaya(){
    this.rest.get(this.userData.Base_URL_KMS+'api/artikel/post/saya/'+this.params1+'/'+this.params2, this.userData.token)
    .subscribe(response =>{
      this.dataSaya = response;
      console.log('Berhasil get artikel saya', this.dataSaya);
    }, err =>{
      console.log(err);
      this.rest.showError(err);
    })
  }
  getArtikelFavorite(){
    console.log('berhasil get artikel favorite');
  }
  doRefresh(refresher){
      setTimeout(() => {
        refresher.complete();
        this.event.publish('artikel:refresh');
      }, 1000);
  }  
  scrollToTop(){
    // this.content.scrollToTop();
    console.log('is scroll end', this.content.ionScrollEnd)
  }
  scrollPosition(ev){
    console.log('scroll position')

  }
  pushArtikelTambahPage(){
    this.app.getRootNav().push('ArtikelEditTambahPage',{page:'Tambah', callback: this.callbackFn, 'ArtikelPage': this});
  }
  callbackFn(param){
    return new Promise ((resolve, reject)=>{
      console.log('callbackl kepanggil')      
      resolve();
    })
  }
  ceka(){
    this.badge = 0;
  }
}
