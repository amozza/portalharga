import { AlertController, LoadingController } from 'ionic-angular';
import { UserData } from './user-data';
import { map } from 'rxjs/operators';
import { Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import 'rxjs/add/observable/throw';


@Injectable()
export class RestProvider  {
  private apiUrl  : string = 'https://restcountries.eu/rest/v2/allasdf';
  private token   : string;

  constructor(
      private http: Http,
      private authHttp: AuthHttp,
      private loadingCtrl: LoadingController,
      private transfer: Transfer,
      private alertCtrl: AlertController,
      private userData: UserData
  ){
    this.userData.getToken()
    .then(
      val =>{
        this.token = val;
      }
    )
    console.log('make new rest provider')
  }

  public get(url: string): Observable<{}> {
    console.log('TOKEN from get ', this.token)
    const header = new Headers();

    header.append('Content-type', 'application/json');
    header.append('Authorization', 'Bearer '+ this.token);
    return this.http.get(url, {headers: header})
      .map(
        (response: Response) => { // extract data
          if(response.status == 204){
            console.log('masuk no content ')
            return null;
          }
          else{
            const body = response.json();
            return body.data || {};
          }
      }
    );

  }

  public post(url: string, claims: any): Observable<{}> {
    const header = new Headers();
    console.log('TOKEN from post ' , this.token)
    header.append('Content-type', 'application/json');
    header.append('Authorization', 'Bearer '+ this.token);
    return this.http.post(url, claims, {headers: header})
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

        let toke='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWE2MWM0ZWZkN2M5NjcxMGQ1MWFlMzciLCJ1c2VyX2lkIjoxMTMsInVzZXJuYW1lIjoicGV0YW5pMjAxOCIsInRpbWUiOiJGcmksIDMwIE1hciAyMDE4IDIwOjIzOjQ5IEdNVCIsInJvbGUiOjQsImxvZ2luX3R5cGUiOjEsImlhdCI6MTUyMjQ0MTQyOX0.mrD9q-R3KibbiVLoKWhYFbzqYE-l3yFQKHsW9MZ1Yp8'
        var options: FileUploadOptions = {
          fileKey: 'file',
          fileName: params.fileName,
          chunkedMode: false,
          mimeType: params.mimeType,
          params: params,
          headers: {'Authorization':'Bearer '+toke},
        }

        fileTransfer.upload(imageUri, uri, options)
          .then((res) => {
          let data = JSON.parse(res.response);
          alert(data)
          console.log('balikan bukti file ', JSON.stringify(res.response))
          console.log(res+" Uploaded Successfully");
          loader.dismiss();

          resolve(JSON.stringify(res.response))
        },(err) => {
          loader.dismiss();
          alert(JSON.stringify(err))
          reject(err)
        });

      })
    } 
  }

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
