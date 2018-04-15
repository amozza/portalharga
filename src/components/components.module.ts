import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CacaComponent } from './caca/caca';
import { ArtikelSayaComponent } from './artikel-saya/artikel-saya';
import { ArtikelExploreComponent } from './artikel-explore/artikel-explore';
import { FileComponent } from './file/file';
import { RoomComponent } from './room/room';
import { KomentarComponent } from './komentar/komentar';
import { FollowToFollowComponent } from './follow-to-follow/follow-to-follow';
import { HtmlEditorComponent } from './html-editor/html-editor';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
	declarations: [CacaComponent,
    ArtikelSayaComponent,
    ArtikelExploreComponent,
    FileComponent,
    RoomComponent,
    KomentarComponent,
    FollowToFollowComponent,
    HtmlEditorComponent],
	imports: [IonicModule, CKEditorModule],
	exports: [CacaComponent,
    ArtikelSayaComponent,
    ArtikelExploreComponent,
    FileComponent,
    RoomComponent,
    KomentarComponent,
    FollowToFollowComponent,
    HtmlEditorComponent],
    providers:[
    ]
})
export class ComponentsModule {}
