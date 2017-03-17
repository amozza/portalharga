import { Component } from '@angular/core';

import { ProfilePetaniPage } from '../profile-petani/profile';
import { InfoHargaPage } from '../../info-harga/info-harga';
import { AspirasiPage } from '../aspirasi/aspirasi';
import { StatusProduksiPage } from '../status-produksi/status-produksi';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = AspirasiPage;
  tab2Root: any = InfoHargaPage;
  tab3Root: any = StatusProduksiPage;
  tab4Root: any = ProfilePetaniPage;

  constructor() {

  }
}
