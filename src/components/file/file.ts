import { Http } from '@angular/http';
import { App } from 'ionic-angular';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the FileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'file',
  templateUrl: 'file.html'
})
export class FileComponent {
  @Input('name') componentName: String;

  text: string;
  data = [];

  constructor(public app: App, public http: Http) {
    console.log('Hello FileComponent Component');
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.text = 'File '+this.componentName;
    this.getAllFile();
  }
  pushBerbagiFilePreviewPage(){
    this.app.getRootNav().push('BerbagiFilePreviewPage')
  }

  getAllFile(){
    this.http.get('https://restcountries.eu/rest/v2/all')
    .subscribe(response =>{
      let data = response.json();
      this.data = data
    }, err =>{
      console.log('error boy', err)
    });
  }
  
}
