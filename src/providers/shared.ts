import { UserData } from './user-data';
import { Camera } from 'ionic-native';
import { Injectable } from '@angular/core';
import { AlertController, ToastController, Nav, LoadingController, ActionSheetController, ModalController, Modal } from 'ionic-angular';
import { File, FileEntry, IFile } from '@ionic-native/file';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ImageResizer } from '@ionic-native/image-resizer';



@Injectable()

export class SharedProvider { 
  
  //Mime type
  public fileAllow      : any= ['application/pdf', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-powerpoint']
  public _maxSizeMateri : number = 10 * Math.pow(1024, 2);
  public streamLampiran : string = 'api/lampiran/file/';    
  
  constructor(private _alert: AlertController, 
              private actionSheetCtrl: ActionSheetController,
              private toastCtrl: ToastController,
              private userData: UserData,
              private loadingCtrl: LoadingController,
              private transfer: Transfer,
              private socialSharing: SocialSharing,
              private imageResizer: ImageResizer,
              private myModal: ModalController,
              private fileChooser: FileChooser,
              private file: File) { }
  
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
            quality: 100
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
  public ActionSheetTakeFile = {
    takeFrom: ()=>{
      return new Promise((resolve, reject)=>{
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Ambil file dari:',
          buttons: [
            {
              text: 'File explorer',
              icon: 'document',
              handler: () => {
                this.fileChooser.open()
                .then(uri=>{
                  let claims = JSON.stringify({
                    statusUpload: 1,
                    fileUri: uri
                  })                  
                  resolve(claims)
                }).catch(err=>{
                  reject(err)
                })
              }
            },
            {
              text: 'Digital Tani',
              icon: 'apps',
              handler: () => {
                const fileKeep: Modal = this.myModal.create('FileKeepPage')
                fileKeep.present()

                fileKeep.onDidDismiss((data, error)=>{
                  //if the data choosed and submitted
                  if(data){
                    let claims = JSON.stringify({
                      statusUpload: 0,
                      data: data
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
  public ActionSheetShare = {
    shareFile: (file) =>{
      return new Promise ((resolve, reject)=>{
        let url = this.userData.Base_URL_KMS+this.streamLampiran;
        // this.socialSharing.share('FIle materi', 'File', [url+file.nama.sistem], url+file.nama.sistem)
        this.socialSharing.shareWithOptions({message: 'File', subject: 'File materi', files: url+file.nama.sistem})
        .then(res=>{
          resolve(true)
        })
        .catch(err =>{
          alert(JSON.stringify(err))
        })
      })
    },
    shareTo: (link, title?)=>{
      return new Promise((resolve, reject)=>{
        let url = this.userData.Base_URL_KMS+this.streamLampiran;
        
        let actionSheet = this.actionSheetCtrl.create({
          title: title || 'Share' ,
          buttons: [
            {
              text: 'Facebook',
              icon: 'logo-facebook',
              handler: () => {
                this.socialSharing.shareViaFacebook('Link', '' , link)
                .then(res =>{
                  console.log('berhasil share via facebook')
                })
                .catch( err =>{
                  alert(JSON.stringify(err));
                })

              }
            },
            {
              text: 'WhatsApp',
              icon: 'logo-whatsapp',
              handler: () => {
                this.socialSharing.shareViaWhatsApp('link', 'http://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png', link)
                .then( res =>{
                  console.log('Berhasil share via whatsapp')
                })
                .catch( err =>{
                  alert(JSON.stringify(err))
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
  public resizeImage(imageUri, quality) {
    return new Promise ((resolve, reject)=>{
      this.imageResizer.resize({uri: imageUri, quality: quality, width: 600, height: 600})
      .then(newUri =>{
        // alert(JSON.stringify(newUri))
        resolve(newUri)
      })
      .catch(err =>{
        alert(JSON.stringify(err))
      })
    })
  }

}