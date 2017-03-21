import { Component } from '@angular/core';

import { ProfilePage } from '../../profile/profile';
import { InfoHargaPage } from '../../info-harga/info-harga';
import { OperasiPasarPage } from '../operasi-pasar/operasi-pasar';
import { JualBeliPage } from '../jual-beli/jual-beli';

@Component({
  templateUrl: 'tabs-masyarakat.html'
})
export class TabsMasyarakatPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab2Root: any = InfoHargaPage;
  tab3Root: any = OperasiPasarPage;  
  tab4Root: any = ProfilePage;
  tab5Root: any = JualBeliPage;
  
  constructor() {

  }
}
