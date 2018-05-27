import { UserData } from './../../providers/user-data';
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
  @Input('name') passedData: String;
  @Input('data') datagan: Array<any>;

  private data      : any = [];

  constructor(public app: App, 
              public userData: UserData, 
              public http: Http) {
    console.log('Hello FileComponent Component');
    
  }

  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
    this.data = this.datagan;
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.data = this.datagan;
  }  
  pushBerbagiFilePreviewPage(data){
    this.app.getRootNav().push('BerbagiFilePreviewPage', {id:data._id});
  }
  
}
