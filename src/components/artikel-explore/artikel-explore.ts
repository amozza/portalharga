import { Component, Input } from '@angular/core';

/**
 * Generated class for the ArtikelExploreComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'artikel-explore',
  templateUrl: 'artikel-explore.html'
})
export class ArtikelExploreComponent {
  @Input('name') componentName: String;

  text: string;

  constructor() {
    console.log('Hello ArtikelExploreComponent Component');

  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.text = 'Artikel '+this.componentName;
  }
}
