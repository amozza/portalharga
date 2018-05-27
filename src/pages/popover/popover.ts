import { Component } from '@angular/core';

import { ViewController, NavController, App, ModalController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { LoginPage } from '../login/login';

@Component({
  template: `
    <ion-list>
      <button ion-item *ngIf="role==4 || role==6" (click)="ubahAlamat()">Ubah ALamat</button>
      <button ion-item (click)="gantiPassword()">Ganti Password</button>
      <button ion-item (click)="logout()">Logout</button>
    </ion-list>
  `
})
export class PopoverPage {
  role : string;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public app: App,
    public modalCtrl: ModalController,
    public userData: UserData
  ) { 
  
  }
  ionViewWillEnter(){
    this.userData.getRole().then((value)=>{
      this.role = value;
    });
  }
  logout() {
    this.userData.logout();
    this.app.getRootNav().setRoot(LoginPage);
    this.viewCtrl.dismiss();
  }
  gantiPassword(){
    this.navCtrl.push('GantiPasswordPage');
    this.viewCtrl.dismiss();
  }
  ubahAlamat(){
    this.navCtrl.push('EditAlamatPage');
    this.viewCtrl.dismiss();
  }

}