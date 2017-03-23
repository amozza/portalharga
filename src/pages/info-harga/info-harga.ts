import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { GoogleMap, Geolocation} from 'ionic-native';
import { UserData } from '../../providers/user-data';
import { TambahInfoHargaPage } from '../masyarakat/tambah-info-harga/tambah-info-harga';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the InfoHarga page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
declare var google: any;

@Component({
  selector: 'page-info-harga',
  templateUrl: 'info-harga.html'
})
export class InfoHargaPage {

  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  komoditas: string = 'Bawang';
  lat: any;
  lng: any;
  userRole: number;
  id: string;
  options: any;
  token: string;
  dataHarga: any;

  constructor(
    public navCtrl: NavController,
    public userData: UserData, 
    public navParams: NavParams,
    public http: Http,
    public toastCtrl: ToastController
    ) {}

  ionViewWillEnter() {
    this.userData.getRole().then((value)=>{
      this.userRole = value;
    });
    this.getAddress();
    this.getDataHarga(this.komoditas);
  }

  ionViewDidLoad() {
  	this.loadMap();
    this.getCurrentLocation();
  }
  showselected(selected_value)
  {
    this.komoditas = selected_value;
    this.getDataHarga(selected_value);
  }
  postHargaKomoditas(){
    this.navCtrl.push(TambahInfoHargaPage);
  }

  getCurrentLocation(){
    Geolocation.getCurrentPosition().then((position) => {
 
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

    }, (err) => {
      console.log(err);
    });
  }

  getAddress(){
    let geocoder = new google.maps.Geocoder();
    let latlng = {lat: -6.560284, lng: 106.7233045};
    geocoder.geocode({'location': latlng}, function(results, status) {
      console.log(results[0].formatted_address);
    });
  }

  loadMap(){
    let latLng = new google.maps.LatLng(-6.560284, 106.7233045);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 	
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 	
 	let infoWindow = new google.maps.InfoWindow({
            content: `<h5>Cabai Merah</h5>
            		  <h6>Rp. 200,000 per Kg</h6>`
          });
 	let marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            title: "Pasar 1"
        });
 	marker.addListener('click', () => {
            infoWindow.open(mapOptions, marker);
          });

 	let latLng2 = new google.maps.LatLng(-6.550000, 106.7233045);
 	let infoWindow2 = new google.maps.InfoWindow({
            content: `<h5>Cabai Merah</h5>
            		  <h6>Rp. 80,000 per Kg</h6>`
          });
 	let marker2 = new google.maps.Marker({
            position: latLng2,
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
            title: "Pasar 2"
        });
 	marker2.addListener('click', () => {
            infoWindow2.open(mapOptions, marker2);
          });

 	let latLng3 = new google.maps.LatLng(-6.560284, 106.7200000);
 	let infoWindow3 = new google.maps.InfoWindow({
            content: `<h5>Cabai Merah</h5>
            		  <h6>Rp. 40,000 per Kg</h6>`
          });
 	let marker3 = new google.maps.Marker({
            position: latLng3,
            map: this.map,
            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
            title: "Pasar 3"
        });
 	marker3.addListener('click', () => {
            infoWindow3.open(mapOptions, marker3);
          });
  }
  getDataHarga(komoditas) {
    this.userData.getToken().then((value) => {
      let headers = new Headers({ 
        'Content-Type': 'application/json',
        'token': value,
        'login_type' : '1'
      });
      this.token = value;
      this.options = new RequestOptions({ headers: headers});
      let input = JSON.stringify({
        jenis: komoditas
      });
      this.http.post(this.userData.BASE_URL+'masyarakat/todayKom',input,this.options).subscribe(res => {
        let a = res.json();
        console.log(a);
        this.dataHarga = a.data;
      }, err => { console.log(err);
          this.showError(err);
      });
    });
  }
  showError(err: any){  
    err.status==0? 
    this.showAlert("Tidak ada koneksi. Cek kembali sambungan Internet perangkat Anda"):
    err.status==403?
    this.showAlert(err.message):
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
