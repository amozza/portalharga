import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { InfoHargaPage } from '../info-harga/info-harga';
import { AspirasiPage } from '../aspirasi/aspirasi';
import { StatusProduksiPage } from '../status-produksi/status-produksi';

@Component({
  templateUrl: 'tabs-masyarakat.html'
})
export class TabsMasyarakatPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab2Root: any = InfoHargaPage;
  tab4Root: any = ProfilePage;

  constructor() {

  }
}
