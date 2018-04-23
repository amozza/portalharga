import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

@IonicPage()
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
