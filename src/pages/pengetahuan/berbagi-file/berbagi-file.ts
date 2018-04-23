import { UserData } from './../../../providers/user-data';
import { RestProvider } from './../../../providers/rest';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App } from 'ionic-angular';



/**
 * Generated class for the BerbagiFilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-berbagi-file',
  templateUrl: 'berbagi-file.html',
})
export class BerbagiFilePage {

  private segment        : string='explore';
  private userRole       : any;
  private dataExplore    : any = [];
  private dataSaya       : any = [];
  private dataFavorite   : any = [];

  // params api request
  private params1        : any;
  private params2        : any;
  
  //lazy load data request
  private skipData       : number = 0;
  private limitData      : number = null;   
  
  constructor(public navCtrl: NavController, 
              public app: App,
              public userData: UserData,
              public event: Events,
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
    this.event.subscribe('file:refresh', ()=>{
      if(this.userRole === 3)
        this.getFileSaya();
      this.getFile();
      this.getFileFavorite();
    });
  }

  ionViewWillEnter(){
    console.log('masuk ke berbagi file')
  }
  ionViewDidLoad() { //fire once
    console.log('ionViewDidLoad BerbagiFilePage');
    this.getFile(); // defauult segment is esplore, then we need to supla explore data first
  }
  selectedSegment(value){
    console.log('segment yang dipilih ', value)
    this.segment = value;
    
    if(this.segment == 'saya' && this.dataSaya.length == 0)
      this.getFileSaya();
    if(this.segment == 'explore' && this.dataExplore.length == 0)
      this.getFile();
    else if(this.segment == 'favorite' && this.dataFavorite.length == 0)
      this.getFileFavorite();
  }  

  /**
   * req API
   */
  getFile(){
    this.rest.get(this.userData.Base_URL_KMS+'api/materi/file/all/'+this.params1+'/'+this.params2, this.userData.token)
    .subscribe( response =>{
      this.dataExplore = response;
      console.log('berhasil get file explore ', this.dataExplore);
    }, err=>{
      console.log(err)
      this.rest.showError(err);
    })
  }
  getFileSaya(){
    this.rest.get(this.userData.Base_URL_KMS+'api/materi/file/saya/'+this.params1+'/'+this.params2, this.userData.token)
    .subscribe( response =>{
      this.dataSaya = response;
      console.log('berhasil get file saya ', this.dataSaya);
    }, err=>{
      console.log(err)
      this.rest.showError(err);
    })
  }
  getFileFavorite(){
    console.log('berhasil get file favorite');
  }
  
  /**
   * page function
   */
  addFile(){
    this.app.getRootNav().push('BerbagiFileEditTambahPage', {page: 'Tambah'});
  }
  pushToPublisher(){
    this.navCtrl.push('BerbagiFilePublisherPage');
  }  
  doRefresh(refresher){
      setTimeout(() => {
        refresher.complete();
        this.event.publish('file:refresh');
      }, 1000);
  }  
}
