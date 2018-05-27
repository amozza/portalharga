import { UserData } from './../../providers/user-data';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the PortalHargaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-portal-harga',
  templateUrl: 'portal-harga.html',
})
export class PortalHargaPage {

  //for mapping tabs
  private userRole;

  //tabs nav component
  tab1Root  : any = 'InfoHargaPage';
  tab2Root  : any = 'ListPetaniPage';
  tab3Root  : any = 'ProfilePenyuluhPage';
  tab4Root  : any = 'MateriPage';
  tab5Root  : any = 'AspirasiPage';
  tab6Root  : any = 'StatusProduksiPage';
  tab7Root  : any = 'ProfilePetaniPage';
  tab8Root  : any = 'JualKomoditasPage';
  tab9Root  : any = 'ProfilePedagangPage';
  tab10Root : any = 'OperasiPasarPage';
  tab11Root : any = 'ProfileMasyarakatPage';
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public userData: UserData) { 
    // check role to select the ion tabs
    this.userData.getRole().then((value)=>{
      this.userRole = value;
      console.log('rolenya ', value)
    });    
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PortalHargaPage');
  }  

}
