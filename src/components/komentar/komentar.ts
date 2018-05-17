import { Events, Content } from 'ionic-angular';
import { AuthHttp } from 'angular2-jwt';
import { Component, Input, Output, EventEmitter, ViewChild, LOCALE_ID } from '@angular/core';

/**
 * Generated class for the KomentarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'komentar',
  templateUrl: 'komentar.html',
  providers: [ {provide: LOCALE_ID, useValue: "id"}]  
})
export class KomentarComponent {
  @ViewChild(Content) content: Content;
  @Input('data') datagen: any;
  @Input('type') type: string;
  @Output('message') message: EventEmitter<string>;
  @Output('idKomentar') idKomentar: EventEmitter<string>;
  
  private data            : any = [];
  private editorMsg       : string;

  constructor(private event:  Events) {
    console.log('Hello KomentarComponent Component');
    this.message = new EventEmitter<string>();  
    this.idKomentar =  new EventEmitter<string>();

    // event listener if message for commnet or reply submitted
    this.event.subscribe('komentar:submit:status', (status)=>{
      if(status) // reset the ngmodel of editor msg
        this.editorMsg = '';
    })

  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
    this.data = this.datagen;
    this.scrollToBottom();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('type komentar: ', this.type);    
  }

  submitMassage(e){
    this.message.emit(this.editorMsg);
  }

  scrollToBottom() {

    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
        console.log('scroll to bottom fired')        
      }
    }, 100)
  }
  
  openBalasan(id){
    this.idKomentar.emit(id);
  }
}
