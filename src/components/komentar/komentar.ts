import { Component } from '@angular/core';

/**
 * Generated class for the KomentarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'komentar',
  templateUrl: 'komentar.html'
})
export class KomentarComponent {

  text: string;

  constructor() {
    console.log('Hello KomentarComponent Component');
    this.text = 'Hello World';
  }

}