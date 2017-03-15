import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, ToastController, NavParams } from 'ionic-angular';
import { Http,Headers,RequestOptions } from '@angular/http';

import { TabsPage } from '../tabs/tabs';
import { TabsMasyarakatPage } from '../tabs-masyarakat/tabs-masyarakat';
import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {username?: string, nama?: string, email?: string, password?: string, role?: any} = {};
  submitted = false;
  headers = new Headers({ 
                'Content-Type': 'application/json',
                'login_type' : '1'});
  options = new RequestOptions({ headers: this.headers});

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public http: Http,
     public navParams: NavParams,
    public userData: UserData
    ) {
    this.signup.role = navParams.data;
  }
  
  changeUserType(type: any){
    this.signup.role = type;
  }
  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      let input = JSON.stringify({
        username: this.signup.username, 
        name: this.signup.nama, 
        email: this.signup.email, 
        password: this.signup.password, 
        role: this.signup.role
      });
      this.http.post(this.userData.BASE_URL+"user/inputUser",input,this.options).subscribe(data => {
           let response = data.json();
           if(response.status=='200') {
             this.userData.signup(response.data);
             this.userData.setToken(response.token);
             switch (response.data.role) {
               case 1:
                 this.navCtrl.setRoot(TabsPage);
                 break;
               case 2:
                 this.navCtrl.setRoot(TabsMasyarakatPage);
                 break;
               
               default:
                 // code...
                 break;
             }
           }
           this.showToast(response.message);
        });
      
      console.log(input);

    }
  }
  showToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
