import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { Http ,Headers,RequestOptions} from '@angular/http';

/*
  Generated class for the GantiPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ganti-password',
  templateUrl: 'ganti-password.html'
})
export class GantiPasswordPage {
	public oldPassword: string;
	public newPassword: string;
	public reTypePassword: string;
	public token:string;
	public id:string;
	public submitted=false;
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public loadCtrl: LoadingController,
  	public http: Http,
  	public userData: UserData,
  	public toastCtrl: ToastController
  	) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GantiPasswordPage');
  }
  ionViewWillEnter(){
  	this.userData.getId().then((value)=>{
  		this.id = value;
    });
    this.userData.getToken().then((value)=>{
      this.token = value;
    });
  }
  onUpdate(form: NgForm) {
    if(this.newPassword == this.reTypePassword) {    	
	    this.submitted = true;
	    let loading = this.loadCtrl.create({
	    	content: 'Tunggu sebentar...'
		});

	    if (form.valid) {
	    	loading.present();
	      let headers = new Headers({ 
	        'Content-Type': 'application/json',
	        'token': this.token,
	        'login_type' : '1'
	      });
	      let options = new RequestOptions({ headers: headers});
	       let param = JSON.stringify({
	       	  us_id : this.id,
	       	  old_password : this.oldPassword,
	          new_password : this.newPassword
	        });
	      this.http.post(this.userData.BASE_URL+'user/updatePassword',param,options).subscribe(res => {
	      	loading.dismiss();
	        let a = res.json();
	        console.log(a);
	        if(a.status == '200') {
	          this.showAlert(a.message);
	          this.navCtrl.popToRoot();
	        }
	      }, err => { 
	      	loading.dismiss();
	      	console.log(err);
	          this.showError(err);
	      });

	    }
	}
  }
  showError(err: any){  
  	switch (err.status) {
  		case 0:
  			this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda");
  			break;
  		case 400:
  			let a = err.json();
  			this.showAlert(a.message);
  			break;
  		case 403:
  			let b = err.json();
  			this.showAlert(b.message);
  			break;
  		default:
  			this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  			break;
  	}
    
  }
  showAlert(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }
}
