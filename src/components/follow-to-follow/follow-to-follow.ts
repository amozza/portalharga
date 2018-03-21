import { Component } from '@angular/core';

/**
 * Generated class for the FollowToFollowComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'follow-to-follow',
  templateUrl: 'follow-to-follow.html'
})
export class FollowToFollowComponent {

  text: string;

  constructor() {
    console.log('Hello FollowToFollowComponent Component');
    this.text = 'Hello World';
  }

}
