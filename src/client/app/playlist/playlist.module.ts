import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './playlist.component';

import { InfiniteScrollModule } from 'angular2-infinite-scroll';

@NgModule({
    imports: [CommonModule, InfiniteScrollModule],
    declarations: [PlaylistComponent],
    exports: [PlaylistComponent]
})

export class PlaylistModule { }
