import { Camera } from 'ionic-native';
import { Injectable } from '@angular/core';
import { AlertController, ToastController, Nav, LoadingController, ActionSheetController, ModalController, Modal } from 'ionic-angular';
import { File, FileEntry, IFile } from '@ionic-native/file';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';



@Injectable()

export class SharedProvider { 
  constructor(private _alert: AlertController, 
              private actionSheetCtrl: ActionSheetController,
              private toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private transfer: Transfer,
              private myModal: ModalController,
              private file: File) { }
  
  //Mime type
  public fileAllow = ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-powerpoint']
  
  public isInArray(array, value): Boolean{
    return array.indexOf(value) > -1;
  }
  
  public Alert = {
    confirm: (msg?, title?) => {
      return new Promise((resolve, reject) => {
        let alert = this._alert.create({
          title: title || 'Konfirmasi',
          message: msg || 'Apakah anda ingin melanjutkan ?',
          buttons: [
            {
              text: 'Batal',
              role: 'cancel',
              handler: () => {
                reject(false);
              }
            },
            {
              text: 'Ok',
              handler: () => {
                resolve(true);
              }
            }
          ]
        });
        alert.present();
      });

    },
    alert: (msg, title?) => {
      let alert = this._alert.create({
        title: title || 'Alert',
        subTitle: msg,
        buttons: ['Ok']
      });

      alert.present();
    }
  }

  public Camera = {
    takePicture: (option?)=>{
      return new Promise((resolve, reject)=>{
        Camera.getPicture({
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: option,
            targetWidth: 600,
            targetHeight: 600
        }).then((imageData) => {
            resolve(imageData)
          })
          .catch((err)=>{
            reject(err)
          })        
      })
    }
  }
  
  public toast = {
    showToast: (message?) =>{
      return new Promise((resolve, reject)=>{
        let toast = this.toastCtrl.create({
          message: message,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();        
      })
    }
  }

  public readFile =  {
    getMetaFile: (uri?) =>{
      return new Promise((resolve, reject)=>{
        let filePath = uri;
        this.file.resolveLocalFilesystemUrl(filePath)
          .then((entry: FileEntry) => {
            return new Promise((resolve, reject) => {
              entry.file(meta => resolve(meta), error => reject(error));
            });
          })
          .then((meta: IFile) => {
            //create meta object
            let fileInfo = {
              name: meta.name,
              size: meta.size,
              type: meta.type
            }
            resolve(JSON.stringify(fileInfo))
          })
          .catch(err=>{
            reject(err)
          })  
      })
    }
  }
  public ActionSheetTakePicture = {
    takeFrom: ()=>{
      return new Promise((resolve, reject)=>{
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Ambil gambar dari:',
          buttons: [
            {
              text: 'Kamera',
              icon: 'camera',
              role: 'destructive',
              handler: () => {
                this.Camera.takePicture(1)
                .then(imageUri=>{
                  let claims = JSON.stringify({
                    statusUpload: 1,
                    imageUri: imageUri
                  })
                  resolve(claims);
                }).catch(err =>{
                  reject(err)
                })
              }
            },
            {
              text: 'Galeri',
              icon: 'images',
              handler: () => {
                this.Camera.takePicture(0)
                .then(imageUri=>{
                  let claims = JSON.stringify({
                    statusUpload:1,
                    imageUri: imageUri
                  })
                  resolve(claims)
                }).catch(err =>{
                  reject(err)
                })
                
              }
            },
            {
              text: 'Digital Tani',
              icon: 'apps',
              handler: () => {
                const fotoGaleri: Modal = this.myModal.create('FotoGaleriPage')
                fotoGaleri.present()

                fotoGaleri.onDidDismiss((data, error)=>{
                  //if the data choosed and submitted
                  if(data){
                    let claims = JSON.stringify({
                      statusUpload: 0,
                      imageUri: data
                    });
                    resolve(claims)
                  }
                    
                })
              }
            },            
            {
              text: 'Cancel',
              role: 'cancel',
              icon: 'close',
              handler: () => {
                console.log('Cancel clicked');
              }
            }
          ]
        });

        actionSheet.present()        
        })
    }
  }

}