import { Component } from '@angular/core';
import { NavController, App, PopoverController } from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { LoginPage } from '../../login/login';
import { ProfileEditPage } from '../../profile-edit/profile-edit';
import { PopoverPage } from '../../popover/popover';
/*
  Generated class for the ProfilePenyuluh page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile-penyuluh',
  templateUrl: 'profile-penyuluh.html'
})
export class ProfilePenyuluhPage {

  	public nama: string;
	public profilePicture: string;
  constructor(
  	public navCtrl: NavController,
    public app: App,
  	public userData: UserData,
    public popoverCtrl: PopoverController
    ) {

  }

  ionViewWillEnter(){
    this.getName();
    this.getProfilePict();
  }
  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
  getName() {
    this.userData.getUsername().then((nama) => {
      this.nama = nama;
    });
  }
  getProfilePict() {
    this.userData.getProfilePict().then((values) => {
      this.profilePicture = values;
    });
  }
  editProfile(){
    this.navCtrl.push(ProfileEditPage);
  }

  logout() {
    this.userData.logout();
    this.app.getRootNav().setRoot(LoginPage);
  }

}
