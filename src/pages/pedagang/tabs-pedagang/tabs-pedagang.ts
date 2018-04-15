import { Component } from '@angular/core';
// import { ProfilePedagangPage } from '../profile-pedagang/profile-pedagang';
// import { InfoHargaPage } from '../../info-harga/info-harga';
// import { JualKomoditasPage } from '../../petani/jual-komoditas/jual-komoditas';

@Component({
  templateUrl: 'tabs-pedagang.html'
})
export class TabsPedagangPage {

  tab1Root: any = 'InfoHargaPage';
  tab2Root: any = 'JualKomoditasPage';
  tab3Root: any = 'ProfilePedagangPage';
  
  constructor() {

  }

}
