import { UserData } from './../../providers/user-data';
import { RestProvider } from './../../providers/rest';
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
  data: any = [];
  params1: any;
  params2: any;

  constructor(public app: App, 
              public rest: RestProvider,
              public userData: UserData, 
              public http: Http) {
    console.log('Hello FileComponent Component');
    this.params1 =JSON.stringify( {"skip": 0, "limit": null} );
    this.params2 = JSON.stringify( {"terbaru": 1, "terpopuler": -1});
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.text = 'File '+this.componentName;
    this.getAllFile();
  }
  pushBerbagiFilePreviewPage(data){
    this.app.getRootNav().push('BerbagiFilePreviewPage', data)
  }

  getAllFile(){
    this.rest.get(this.userData.Base_URL_KMS+'api/materi/file/all/'+this.params1+'/'+this.params2)
    .subscribe(
      data =>{
        console.log('berhasil get all file ', data)
        this.data = data;
      },
      err =>{
        alert(JSON.stringify(err));
      }
    )
  }
  
}
