import { Component, Input } from '@angular/core';

/**
 * Generated class for the FileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'file',
  templateUrl: 'file.html'
})
export class FileComponent {
  @Input('name') componentName: String;

  text: string;

  constructor() {
    console.log('Hello FileComponent Component');
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.text = 'File '+this.componentName;
  }
}
