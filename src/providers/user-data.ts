import { Injectable } from '@angular/core';

import { Events,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  BASE_URL = 'http://punyanpan.net:5000/';
  headers = new Headers({
      'Content-Type': 'application/json'
    });
  options = new RequestOptions({
    headers: this.headers
    });

  constructor(
    public events: Events,
    public http: Http,
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

  getUsername() {
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
