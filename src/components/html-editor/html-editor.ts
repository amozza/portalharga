import { Platform } from 'ionic-angular';
import { UserData } from './../../providers/user-data';
import { RestProvider } from './../../providers/rest';
import { SharedProvider } from './../../providers/shared';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

/**
 * Generated class for the HtmlEditorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'html-editor',
  templateUrl: 'html-editor.html'
})
export class HtmlEditorComponent {
  @ViewChild('ckeditor') ckeditor:any;
  @Input('content') public content: string;
  @Output() public contentChanged: EventEmitter<string>;
  @Output() public focus: EventEmitter<string>;

  private fileName: string;

  private ckeConfig = { 
            height: 400,
            language: "en",
            allowedContent: true,
            toolbar: [
                { name: 'styles', items : [ 'Format' ] },
                { name: 'basicstyles', items : [ 'Bold','Italic','Paste'] },
                { name: 'paragraph', items : [ 'NumberedList','BulletedList','JustifyCenter','JustifyRight'] },
                { name: "insert", items: ["Table", "HorizontalRule", "imageExplorer"] },
                { name: "clipboard", items: ["Undo", "Redo"] },
            ]
        };

  constructor(private platform: Platform, private shared: SharedProvider, private rest: RestProvider, private userData: UserData) {
    console.log('HtmlEditor Component fired');
    this.contentChanged = new EventEmitter<string>();   
    this.focus = new EventEmitter<string>(); 
  }

  onChange(e) {
    this.contentChanged.emit(e);
  }

  onFocus(e){
    this.focus.emit(e);
  }

/**
 * 
 * custom image functions
 */
  takePicture($event: any) {
    this.shared.ActionSheetTakePicture.takeFrom()
    .then(JSON.parse)
    .then(data =>{
      if(data.statusUpload){// if its need to be uploaded first
        console.log('harus di upload dulu ', data.imageUri);
        let imageuri = data.imageUri;
        let sourceFileName = imageuri.substring(imageuri.lastIndexOf('/') + 1, imageuri.length);
        sourceFileName = sourceFileName.split('?').shift();
        //get the name
        this.fileName = sourceFileName;
        console.log('filename ', this.fileName);
        //upload picture
        this.uploadImage(data.imageUri);
      }
      else{
        let picture = this.userData.Base_URL_KMS+'api/lampiran/file/'+data.imageUri;            
        this.addImage(picture);
      }
    }).catch(err =>{
      alert(err)
    })
  }
  uploadImage(imageUri){
    let params = {
      "fileName": this.fileName || 'gambar.jpg',
      "mimeType": 'image/jpeg',
      "token": this.userData.token      
    }
    
    this.rest.upload.fileUpload(this.userData.Base_URL_KMS+'api/lampiran/file/upload', imageUri, params)
    .then(JSON.parse)
    .then(res=>{
      this.shared.toast.showToast('Unggah gambar berhasil');
      let picture = this.userData.Base_URL_KMS+'api/lampiran/file/'+res.data.nama.sistem;            
      this.addImage(picture);
    })
  }
  addImage(picture){ //add tag img to editor
        try
        {
            let link = this.ckeditor.instance.document.createElement("img");
            link.setAttribute("alt", "Image");
            link.setAttribute("src", picture);
            link.setAttribute("width", this.platform.width());
            link.setAttribute("style", "margin-left: auto; margin-right auto");
            this.ckeditor.instance.insertElement(link);
        }
        catch(error)
        {
            console.log((<Error>error).message);
            alert(JSON.stringify(error))
        }    
  }
        
}
