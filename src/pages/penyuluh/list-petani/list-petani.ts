import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ActionSheetController, LoadingController} from 'ionic-angular';
import { UserData } from '../../../providers/user-data';
import { AuthHttp } from 'angular2-jwt';
import { TambahPetaniPage } from '../tambah-petani/tambah-petani';
// import { ViewPetaniPage } from '../view-petani/view-petani';
import { EditPetaniPage } from '../edit-petani/edit-petani';
// import { EditAlamatPetaniPage } from '../edit-alamat-petani/edit-alamat-petani';
/*
  Generated class for the ListPetani page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-list-petani',
  templateUrl: 'list-petani.html'
})
export class ListPetaniPage {
	public userPetani = [];
  public originalUserPetani = []; 
  public loading: any;
  public searchTerm: string = '';
  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
    public authHttp: AuthHttp,
    public userData: UserData,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    public loadCtrl: LoadingController) {}

  ionViewWillEnter(){
    this.getData();
  }
  
  onSearchInput(){
        this.userPetani = this.filterItems(this.searchTerm);
  }

  filterItems(searchTerm){
      return this.originalUserPetani.filter((item) => {
          return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });     
  }

  getData() {
    this.authHttp.get(this.userData.BASE_URL+'user/get/role/4').subscribe(res => {
      let response = res.json();
      if(response.status == 200) {
        console.log(response);
	    this.userPetani = response.data;
      } else if(response.status == 204) {
      	this.userPetani = [];
      }
      this.originalUserPetani = this.userPetani;
    }, err => { console.log(err);
        this.showError(err);
    });
  }
  tambahPetani(){
    this.navCtrl.push(TambahPetaniPage,2);
  }
  hapusPetani(id){
    this.loading = this.loadCtrl.create({
        content: 'Tunggu sebentar...'
    });
    this.loading.present();
    let param = JSON.stringify({
      user_id : id
    });
    this.authHttp.post(this.userData.BASE_URL+'user/delete',param).subscribe(res => {
      this.loading.dismiss();
      let response = res.json();
      if(response.status == 200) {
        this.getData();
        this.showAlert(response.message);
      }
    }, err => { 
      this.loading.dismiss();
      this.showError(err);
    });
  }
  editAlamat(user){
    // this.navCtrl.push(EditAlamatPetaniPage,user);
  }
  editPetani(user){
    this.navCtrl.push(EditPetaniPage,user);
  }
  presentActionSheet(dataPetani) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Pilihan',
      buttons: [
        {
          text: 'Lihat detail',
          role: 'lihatDetail',
          handler: () => {
            // this.navCtrl.push(ViewPetaniPage,dataPetani);
            this.toastCtrl.create({
              message: "fitur ini belum ada"
            })
          }
        },
        {
          text: 'Edit profile',
          role: 'editProfile',
          handler: () => {
            this.navCtrl.push(EditPetaniPage,dataPetani);
          }
        },
        {
          text: 'Edit alamat',
          role: 'editAlamat',
          handler: () => {
            // this.navCtrl.push(EditAlamatPetaniPage,dataPetani);
            this.toastCtrl.create({
              message: "fitur ini belum ada"
            })            
          }
        },
        {
          text: 'Hapus petani',
          role: 'hapusPetani',
          handler: () => {
            this.hapusPetani(dataPetani.user_id);
          }
        }
      ]
    });
    actionSheet.present();
    // this.navCtrl.push(ViewPetaniPage,dataPetani);
  }
  showError(err: any){  
    err.status==0? 
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    this.showAlert("Tidak dapat menyambungkan ke server. Mohon muat kembali halaman ini");
  }
  showAlert(message: string){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
