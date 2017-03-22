import { Component } from '@angular/core';

import { ViewController, NavController, App, ModalController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';
import { GantiPasswordPage } from '../ganti-password/ganti-password';



@Component({
  template: `
    <ion-list>
      <button ion-item (click)="gantiPassword()">Ganti Password</button>
      <button ion-item (click)="logout()">Logout</button>
    </ion-list>
  `
})
export class PopoverPage {

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController,
    public userData: UserData
  ) { }

  logout() {
    this.userData.logout();
    this.app.getRootNav().setRoot(LoginPage);
    this.viewCtrl.dismiss();
  }
  gantiPassword(){
    this.navCtrl.push(GantiPasswordPage);
    this.viewCtrl.dismiss();
  }
}