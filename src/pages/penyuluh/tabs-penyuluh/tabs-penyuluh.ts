import { Component } from '@angular/core';
// import { InfoHargaPage } from '../../info-harga/info-harga';
// import { ListPetaniPage } from '../list-petani/list-petani';
// import { ProfilePenyuluhPage } from '../profile-penyuluh/profile-penyuluh';
// import { MateriPage } from '../materi/materi';

/*
  Generated class for the TabsPenyuluh page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'tabs-penyuluh.html'
})
export class TabsPenyuluhPage {

  tab1Root: any = 'InfoHargaPage';
  tab2Root: any = 'ListPetaniPage';
  tab3Root: any = 'ProfilePenyuluhPage';
  tab4Root: any = 'MateriPage';
  constructor() {}


}
