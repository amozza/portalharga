import { Component } from '@angular/core';



@Component({
  templateUrl: 'tabs-masyarakat.html'
})
export class TabsMasyarakatPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab2Root: any = 'InfoHargaPage';
  tab3Root: any = 'OperasiPasarPage';  
  tab4Root: any = 'ProfileMasyarakatPage';
  tab5Root: any = 'JualKomoditasPage';
  
  constructor() {

  }
}
