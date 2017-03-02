import { Component } from '@angular/core';
import { NavController, AlertController, App } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { Storage } from '@ionic/storage';


/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
	nama: string;
  constructor(
  	public alertCtrl: AlertController, 
  	public nav: NavController,
    public app: App,
    public storage: Storage, 
  	public userData: UserData) {

  }

  ngAfterViewInit() {
  }

  ionViewWillEnter(){
    this.getName();
  }
  updatePicture() {
    console.log('Clicked to update picture');
  }

  getName() {
    this.userData.getUsername().then((nama) => {
      this.nama = nama;
    });
  }
  editProfile(){
    this.nav.push(ProfileEditPage);
  }

  logout() {
    this.userData.logout();
    this.app.getRootNav().setRoot(LoginPage);
   // this.nav.setRoot(LoginPage);
  }

}
