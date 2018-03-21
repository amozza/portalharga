import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { CacaComponent } from './caca/caca';
import { ArtikelSayaComponent } from './artikel-saya/artikel-saya';
import { ArtikelExploreComponent } from './artikel-explore/artikel-explore';
import { FileComponent } from './file/file';
import { RoomComponent } from './room/room';
import { KomentarComponent } from './komentar/komentar';
import { FollowToFollowComponent } from './follow-to-follow/follow-to-follow';


@NgModule({
	declarations: [CacaComponent,
    ArtikelSayaComponent,
    ArtikelExploreComponent,
    FileComponent,
    RoomComponent,
    KomentarComponent,
    FollowToFollowComponent],
	imports: [IonicModule],
	exports: [CacaComponent,
    ArtikelSayaComponent,
    ArtikelExploreComponent,
    FileComponent,
    RoomComponent,
    KomentarComponent,
    FollowToFollowComponent]
})
export class ComponentsModule {}
