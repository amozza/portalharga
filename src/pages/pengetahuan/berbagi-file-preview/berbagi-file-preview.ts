import { FileOpener } from '@ionic-native/file-opener';
import { RestProvider } from './../../../providers/rest';
import { SharedProvider } from './../../../providers/shared';
import { UserData } from './../../../providers/user-data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, App, LoadingController, Events, Platform } from 'ionic-angular';
import { File, FileEntry, IFile } from '@ionic-native/file';

/**
 * Generated class for the BerbagiFilePreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-berbagi-file-preview',
  templateUrl: 'berbagi-file-preview.html',
})
export class BerbagiFilePreviewPage {

  private passedParam     : any;
  private materi          : any;

  constructor(public app: App, 
              public shared: SharedProvider,
              public file: File,
              public fileOpener: FileOpener,
              public platform : Platform,
              public rest: RestProvider,
              public loadingCtrl: LoadingController,
              public event: Events,
              public actionSheetCtrl: ActionSheetController,
              public userData: UserData, 
              public navCtrl: NavController, 
              public navParams: NavParams) {
    // get the params from the caller page
    this.passedParam = navParams.data;
    console.log('lemparan datanya ', this.passedParam)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BerbagiFilePreviewPage');
    this.getMateriById();    
  }

/**
 * req api
 */
  retrieveFile(file){ // check if file has already downloded and stored in local
    return new Promise ((resolve, reject)=>{
      this.file.checkFile(this.file.externalDataDirectory, file.nama.asli)
      .then((data) =>{
        this.openFile(file);
      })
      .catch(()=>{
        this.rest.upload.fileDownload(this.userData.Base_URL_KMS+'api/lampiran/file/'+file.nama.sistem, {"fileName": file.nama.asli})
        .then(res =>{
          console.log('berhasil download file');
          this.openFile(file);
        })        
      })   
    })
  }
  openFile(file){ // open file with its default mime type
    //get the meta file first
    this.shared.readFile.getMetaFile(this.file.externalDataDirectory+file.nama.asli)
    .then(JSON.parse)
    .then(data =>{
      let mimeType = data.type;
      //open file
      this.fileOpener.open(this.file.externalDataDirectory+file.nama.asli, mimeType)
      .then(()=>{
        console.log('file opened')
      })
      .catch( err=>{
        alert(JSON.stringify(err))
      })      
    })

  }
  deleteFile(){
    let claims = JSON.stringify({
      id: this.passedParam._id
    })

    let loader = this.loadingCtrl.create({
      content: "Harap tunggu..."
    });
    loader.present();
    
    this.rest.delete(this.userData.Base_URL_KMS+'api/materi/topik/hapus', this.userData.token, claims)
    .subscribe(
      res =>{
        loader.dismiss();
        this.event.publish('materi:preview:refresh');
        this.event.publish('materi:refresh');
        this.navCtrl.pop();
        this.shared.toast.showToast('Berhasil menghapus materi')
      }, err =>{
        loader.dismiss();
        alert(JSON.stringify(err))
      }
    )
  }
  getMateriById(){
    let uri = this.userData.Base_URL_KMS+'api/materi/topik/'+this.passedParam._id;
    this.rest.get(uri, this.userData.token)
    .subscribe( res =>{
      console.log('berhasil get materi by id ', res)
      this.materi = res;
    }, err =>{
      alert(JSON.stringify(err))
    })
  }
/**
 * page function
 */
  pushBerbagiFilePublisher(){
    this.navCtrl.push('BerbagiFilePublisherPage');
    console.log('push to berbagi file page');
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Hapus',
          role: 'destructive',          
          icon: 'trash',
          handler: () => {
            this.shared.Alert.confirm('Apakah anda yakin ?')
            .then(res=>{
              this.deleteFile();
            },err =>{
              console.log('ga jadi ah')
            })
          }
        },{
          text: 'Edit',
          icon: 'create',
          handler: () => {
            this.navCtrl.push('BerbagiFileEditTambahPage', {page:"Edit", data: this.materi});
          }
        },{
          text: 'Share',
          icon: 'share',
          handler: () => {
            console.log('Share clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }    
  pushKomentarPage(){
    this.navCtrl.push('KomentarPage', {type: 'materi', id: this.passedParam._id, typeComment: 'komentar'});
  }  
}
