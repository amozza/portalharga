import { AlertController, LoadingController, ToastController } from 'ionic-angular';
import { UserData } from './user-data';
import { map } from 'rxjs/operators';
import { Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File, FileEntry, IFile } from '@ionic-native/file';

import 'rxjs/add/observable/throw';


@Injectable()
export class RestProvider    {
  private apiUrl  : string = 'https://restcountries.eu/rest/v2/allasdf';

  constructor(
      private http: Http,
      private file: File,
      private toastCtrl: ToastController,
      private authHttp: AuthHttp,
      private loadingCtrl: LoadingController,
      private transfer: Transfer,
      private alertCtrl: AlertController,
      private userData: UserData
  ){
    console.log('rest provider init')
  }

  public get(url: string, token: string): Observable<{}> {
    console.log('TOKEN from get ', token)
    const header = new Headers();

    header.append('Content-type', 'application/json');
    header.append('Authorization', 'Bearer '+ token);
    return this.http.get(url, {headers: header})
      .map(
        (response: Response) => { // extract data
          if(response.status == 204){
            console.log('masuk no content ')
            let toast = this.toastCtrl.create({
              message: 'Tidak ada data',
              duration: 1000,
              position: 'bottom'
            });
            toast.present();               
            return [];
          }
          else{
            const body = response.json();
            return body.data || {};
          }
      }
    );

  }

  public post(url: string, token:string, claims: any): Observable<{}> {
    const header = new Headers();
    console.log('TOKEN from post ' , token)
    header.append('Content-type', 'application/json');
    header.append('Authorization', 'Bearer '+ token);
    return this.http.post(url, claims, {headers: header})
      .map( 
        (response: Response)=>{
          const body = response.json();
          console.log('respinya ', body)
          return body || {};          
      })
  }
  public delete(url: string, token:string, claims: any): Observable<{}> {
    const header = new Headers();
    console.log('TOKEN from post ' , token)
    header.append('Content-type', 'application/json');
    header.append('Authorization', 'Bearer '+ token);
    return this.http.delete(url, {headers: header, body: claims})
      .map( 
        (response: Response)=>{
          const body = response.json();
          return body.data || {};          
      })
  }    

  public patch(url: string, token:string, claims: any): Observable<{}> {
    const header = new Headers();
    console.log('TOKEN from patch ' , token)
    header.append('Content-type', 'application/json');
    header.append('Authorization', 'Bearer '+ token);
    return this.http.patch(url, claims, {headers: header})
      .map( 
        (response: Response)=>{
          const body = response.json();
          return body.data || {};       
      })
  }    

  public upload = {
    fileUpload: (uri, imageUri, params)=>{
      return new Promise((resolve, reject)=>{
        console.log('uri file ',imageUri )
        let loader = this.loadingCtrl.create({
          content: "Uploading..."
        });
        loader.present();
        const fileTransfer: TransferObject = this.transfer.create();

        // let toke='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWE2MWM0ZWZkN2M5NjcxMGQ1MWFlMzciLCJ1c2VyX2lkIjoxMTMsInVzZXJuYW1lIjoicGV0YW5pMjAxOCIsInRpbWUiOiJGcmksIDMwIE1hciAyMDE4IDIwOjIzOjQ5IEdNVCIsInJvbGUiOjQsImxvZ2luX3R5cGUiOjEsImlhdCI6MTUyMjQ0MTQyOX0.mrD9q-R3KibbiVLoKWhYFbzqYE-l3yFQKHsW9MZ1Yp8'
        var options: FileUploadOptions = {
          fileKey: 'file',
          fileName: params.fileName,
          chunkedMode: false,
          mimeType: params.mimeType,
          params: params,
          headers: {'Authorization':'Bearer '+params.token},
        }

        fileTransfer.upload(imageUri, uri, options)
          .then((res) => {
          let data = res.response;
          console.log(res+" Uploaded Successfully");
          loader.dismiss();

          resolve(data)
        },(err) => {
          loader.dismiss();
          alert(JSON.stringify(err))
          reject(err)
        });

      })
    },
    fileDownload: (uri, params) =>{
      return new Promise((resolve, reject)=>{
        let loader = this.loadingCtrl.create({
          content: "Downloading..."
        });
        loader.present();
        const fileTransfer: TransferObject = this.transfer.create();
        fileTransfer.download(uri, this.file.externalDataDirectory + params.fileName, true)
        .then( res =>{
          loader.dismiss();;
          console.log('berhaskil ganteng ', res.toURL())
          resolve(res)
        }, errr =>{
          loader.dismiss();
          alert(JSON.stringify(errr))
        })
      })
    }
  }

  //method for connection lost
  public showError(error:any){
    console.log('showerror fire')
    if(error.status === 0){ ///check if the connection fall
      alert('Error koneksi ke server gagal. Silahkan cek kembali sambungan Anda.')
    }
    else{
      alert('Error '+ error.status +' '+ error.statusText + ' from '+ error.url)
    }
  }

}
