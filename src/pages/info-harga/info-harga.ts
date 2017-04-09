import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { GoogleMap, Geolocation} from 'ionic-native';
import { UserData } from '../../providers/user-data';
import { TambahInfoHargaPage } from '../masyarakat/tambah-info-harga/tambah-info-harga';
import { AuthHttp } from 'angular2-jwt';
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
  choosedKomoditas: string = 'All';
  lat: any;
  lng: any;
  userRole: number;
  id: string;
  dataHarga = [];
  marker = [];
  dataKomoditas=[];

  constructor(
    public navCtrl: NavController,
    public userData: UserData, 
    public navParams: NavParams,
    public authHttp: AuthHttp,
    public toastCtrl: ToastController
    ) {}

  ionViewWillEnter() {
    this.userData.getRole().then((value)=>{
      this.userRole = value;
    });
    this.userData.getKomoditas().then((value)=>{
      if(value) {
        this.dataKomoditas = value;
      } else {
        this.getKomoditas();
      }
    });
    // this.getDataHarga(this.komoditas);
  }

  ionViewDidLoad() {
    let latLng = new google.maps.LatLng(-6.560284, 106.7233045);
    let mapOptions = {
      center: latLng,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.getCurrentLocation();
  }
  showselected(selected_value)
  {
    this.choosedKomoditas = selected_value;
    this.clearMarker();
    this.getDataHarga(selected_value);
  }
  postHargaKomoditas(){
    this.navCtrl.push(TambahInfoHargaPage);
  }

  getCurrentLocation(){
    Geolocation.getCurrentPosition().then((position) => {
 
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      let latLng = new google.maps.LatLng(this.lat, this.lng);
      let mapOptions = {
        center: latLng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    }, (err) => {
      console.log(err);
    });
  }
  getKomoditas() {
    this.authHttp.get(this.userData.BASE_URL+'komoditas/get').subscribe(res => {
      let response = res.json();
      console.log(response);
      if(response.status == 200) {
        this.dataKomoditas = response.data;
      } else if(response.status == 204){
        this.dataKomoditas = [];
      }
    }, err => { 
        this.showError(err);
    });
  }

  loadMarker(){
    for(let data of this.dataHarga){
      let latLng = new google.maps.LatLng(data.latitude, data.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      let infoWindow = new google.maps.InfoWindow({
        content: '<h5>'+data.jenis+'</h5><h6>Rp. '+data.harga+' per Kg</h6>'
      });
      let marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        title: "Pasar 1"
      });
      this.marker.push(marker);
      marker.addListener('click', () => {
        infoWindow.open(mapOptions, marker);
      });
    
    }
  }
  clearMarker(){
    for(let data of this.marker){
      data.setMap(null);
    }
    this.marker = [];
  }
  getDataHarga(komoditas) {
    this.dataHarga = [];
      let input = JSON.stringify({
        jenis: komoditas
      });
      this.authHttp.post(this.userData.BASE_URL+'laporanHarga/get/day/1',input).subscribe(res => {
        let response = res.json();
        console.log(response);
        if(response.status == 200) {
          this.dataHarga = response.data;
        } else if(response.status == 204) {
          this.dataHarga = [];
        }
        this.loadMarker();
      }, err => { console.log(err);
          this.showError(err);
      });
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
