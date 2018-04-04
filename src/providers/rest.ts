import { AlertController } from 'ionic-angular';
import { UserData } from './user-data';
import { map } from 'rxjs/operators';
import { Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper, AuthHttp } from 'angular2-jwt';
import 'rxjs/add/observable/throw';


@Injectable()
export class RestProvider  {
  private apiUrl  : string = 'https://restcountries.eu/rest/v2/allasdf';
  private token   : string;

  constructor(
      private http: Http,
      private authHttp: AuthHttp,
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
          console.log('response ganteng', response)
          console.log('response.status', response.status)
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
    console.log('headernya boy ', header)
    return this.http.post(url, claims, {headers: header})
      .map( 
        (response: Response)=>{
          console.log('response ganteng', response)
          const body = response.json();
          return body.data || {};          
      })
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
