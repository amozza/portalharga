import { Component, Input } from '@angular/core';

/**
 * Generated class for the CacaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'caca',
  templateUrl: 'caca.html'
})
export class CacaComponent {
  @Input('masuk') name: String;
  text: string;

  constructor() {
    console.log('Hello CacaComponent Component');
    this.text = 'Hello World';
  }
  ngOnInit(){
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   console.log('open caca comopnent  ')

  }
  action(){
    console.log('dari halaman mana',this.name)
  }

}
