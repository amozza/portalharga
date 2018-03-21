import { Component } from '@angular/core';

/**
 * Generated class for the RoomComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'room',
  templateUrl: 'room.html'
})
export class RoomComponent {

  text: string;

  constructor() {
    console.log('Hello RoomComponent Component');
    this.text = 'Hello World';
  }

}
