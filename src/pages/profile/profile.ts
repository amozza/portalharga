import { Component } from '@angular/core';
import { NavController, AlertController, App } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';
import { KirimStatusProduksiPage } from '../kirim-status-produksi/kirim-status-produksi';
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
	username: string;
  email: string;
  constructor(
  	public alertCtrl: AlertController, 
  	public nav: NavController,
    public app: App,
    public storage: Storage, 
  	public userData: UserData) {

  }

  ngAfterViewInit() {
    this.getUsername();
  }

  updatePicture() {
    console.log('Clicked to update picture');
  }

  // Present an alert with the current username populated
  // clicking OK will update the username and display it
  // clicking Cancel will close the alert and do nothing
  changeUsername() {
    let alert = this.alertCtrl.create({
      title: 'Change Username',
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: 'username',
      value: this.username,
      placeholder: 'username'
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
        this.userData.setUsername(data.username);
        this.getUsername();
      }
    });

    alert.present();
  }

  getUsername() {
    this.userData.getUsername().then((username) => {
      this.username = username;
    });
    this.storage.get('user_data').then((value) => {
      this.email = value.email;
    });
  }

  changePassword() {
    console.log('Clicked to change password');
  }

  logout() {
    this.userData.logout();
    this.app.getRootNav().setRoot(LoginPage);
   // this.nav.setRoot(LoginPage);
  }

  statusProduksi(){
    this.nav.push(KirimStatusProduksiPage);
  }
}
