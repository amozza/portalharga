import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleMap, Geolocation} from 'ionic-native';
import { UserData } from '../../providers/user-data';
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
  komoditas: string = 'Cabai';
  lat: any;
  lng: any;
  userRole: number;

  constructor(
    public navCtrl: NavController,
    public userData: UserData, 
    public navParams: NavParams) {}

  ionViewWillEnter() {
    this.userData.getRole().then((value)=>{
      this.userRole = value;
    });
    //this.getOperasi();
  }

  ionViewDidLoad() {
  	this.loadMap();
    this.getCurrentLocation();
  }
  showselected(selected_value)
  {
    this.komoditas = selected_value;
    console.log("selector: ", this.komoditas );
  }

  getCurrentLocation(){
    Geolocation.getCurrentPosition().then((position) => {
 
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

    }, (err) => {
      console.log(err);
    });
  }
  // loadMap2(){
  //   let location = new google.maps.LatLng(-6.560284, 106.7233045);
  //   this.map = new GoogleMap('map', {
  //         'backgroundColor': 'white',
  //         'controls': {
  //           'compass': true,
  //           'myLocationButton': true,
  //           'indoorPicker': true,
  //           'zoom': true
  //         },
  //         'gestures': {
  //           'scroll': true,
  //           'tilt': true,
  //           'rotate': true,
  //           'zoom': true
  //         },
  //         'camera': {
  //           'latLng': location,
  //           'tilt': 30,
  //           'zoom': 15,
  //           'bearing': 50
  //         }
  //       });
  // }

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

}
