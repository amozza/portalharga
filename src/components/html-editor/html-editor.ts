import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Generated class for the HtmlEditorComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'html-editor',
  templateUrl: 'html-editor.html'
})
export class HtmlEditorComponent {

  @Input('content') public content: string;
  @Output() public contentChanged: EventEmitter<string>;
  @Output() public focus: EventEmitter<string>;

  constructor() {
    console.log('HtmlEditor Component fired');
    this.contentChanged = new EventEmitter<string>();   
    this.focus = new EventEmitter<string>(); 
  }
  onChange(e) {
    this.contentChanged.emit(e);
  }

  onReady(e) {// this.contentChanged.emit(e);
    
  }  
  onFocus(e){
    this.focus.emit(e);
  }


}
