import { Injectable } from '@angular/core';

import { Events,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  BASE_URL = 'http://yippytech.com:5000/';
  // BASE_URL = 'http://192.168.1.100:5000/';
  // BASE_URL = 'http://portal.agri.web.id:5000/';

  constructor(
    public events: Events,
    public toastCtrl: ToastController,
    public storage: Storage
  ) {}


  login(data: string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('user_data', data);
    // this.setUsername(username);
    this.events.publish('user:login');
  };

  signup(data: string) {

    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('user_data', data);
    this.events.publish('user:signup');
    // this.setUsername(username);
    
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('user_data');
    this.storage.remove('token');
    this.events.publish('user:logout');
  };

  setUsername(username: string) {
    this.storage.set('username', username);
  };
  setToken(token: string){
     this.storage.set('token', token);
  }
  getData() {
    return this.storage.get('user_data').then((value) => {
      return value;
    });
  }
  getUsername() {
    return this.storage.get('user_data').then((value) => {
      return value.name;
    });
  };
  getName() {
    return this.storage.get('user_data').then((value) => {
      return value.name;
    });
  };
  getToken() {
    return this.storage.get('token').then((value) => {
      return value;
    });
  };
  getId(){
    return this.storage.get('user_data').then((value) => {
      return value.us_id;
    });
  }
  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  

}
