import { Injectable } from '@angular/core';

import { Events,ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  BASE_URL = 'https://ph.yippytech.com:5000/';
  token:any;
  data:any;
  constructor(
    public events: Events,
    public toastCtrl: ToastController,
    public storage: Storage,
    public authHttp: AuthHttp
  ) {}

  login(data: string) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('user_data', data);
    this.events.publish('user:login');
  };

  signup(data: string) {

    this.storage.set(this.HAS_LOGGED_IN, true);
    this.storage.set('user_data', data);
    this.events.publish('user:signup');
  };

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('user_data');
    this.storage.remove('token');
    this.storage.remove('komoditas');
    this.events.publish('user:logout');
  };

  setUsername(username: string) {
    this.storage.set('username', username);
  };
  setToken(token: string){
     this.storage.set('token', token);
  }
  setAddress(address: string){
    this.storage.get('user_data').then((value) => {
      let data = value;
      data.address = address;
      this.storage.set('user_data', data);
    });
  }
  getData() {
    return this.storage.get('user_data').then((value) => {
      return value;
    });
  }
  updateProfilePict(picture) {
    this.storage.get('user_data').then((value) => {
      let data = value;
      data.picture = picture;
      this.storage.set('user_data', data);
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
  getProfilePict() {
    return this.storage.get('user_data').then((value) => {
      return value.picture;
    });
  };
  getToken() {
    return this.storage.get('token').then((value) => {
      console.log(value);
      return value;
    });
  };
  getRole() {
    return this.storage.get('user_data').then((value) => {
      return value.role;
    });
  };
  getId(){
    return this.storage.get('user_data').then((value) => {
      return value.user_id;
    });
  }
  getAddress(){
    return this.storage.get('user_data').then((value) => {
      return value.address;
    });
  }
  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  getKomoditasFromServer(){
    this.authHttp.get(this.BASE_URL+'komoditas/get').subscribe(res => {
      let response = res.json();
      if(response.status == 200) {
        this.storage.set('komoditas', response.data);
      } else if(response.status == 204){
        this.storage.set('komoditas', []);
      }
    });
  }

  getKomoditas(){
    return this.storage.get('komoditas').then((value) => {
      return value;
    });
  }

//   load() {
//   if (this.data) {
//     // already loaded data
//     return Promise.resolve(this.data);
//   }

//   // don't have the data yet
//   return new Promise(resolve => {
//     // We're using Angular HTTP provider to request the data,
//     // then on the response, it'll map the JSON data to a parsed JS object.
//     // Next, we process the data and resolve the promise with the new data.
//     this.http.get('https://randomuser.me/api/')
//       .map(res => res.json())
//       .subscribe(data => {
//         // we've got back the raw data, now generate the core schedule data
//         // and save the data for later reference
//         this.data = data;
//         console.log(data);
//         resolve(this.data);
//       });
//   });
// }

}
