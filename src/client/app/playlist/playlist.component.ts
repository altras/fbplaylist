import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FacebookService } from '../services/facebook.service';
import { YouTubeVideoData } from './model/YouTubeVideoData';
import { YoutubeService } from '../services/youtube.service';

declare var YT: any;

/**
* This class represents the lazy loaded PlaylistComponent.
*/
@Component({
  moduleId: module.id,
  selector: 'sd-playlist',
  templateUrl: 'playlist.component.html',
  styleUrls: ['playlist.component.css'],
  providers: [FacebookService, YoutubeService]
})
export class PlaylistComponent implements OnInit {

  link: string;
  isFacebookLoggedIn: boolean = true;
  player: any;
  done: boolean = false;
  ids: string[] = [];

  videos : YouTubeVideoData[] = [];
  currentVideoPos : number = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private facebookService: FacebookService,
    private youtubeService: YoutubeService) {
    facebookService.init();
  }

  ngOnInit() {
    let queryParams: any = this.route.queryParams;
    this.link = queryParams.getValue().link
    this.facebookService.getLoginStatus().then((res: any) => {
      if(res.status === 'connected') {
        this.getPostLinks('/1741337529467978/feed') // use this.link query Params here
      } else {
        this.isFacebookLoggedIn = false;
      }
    })
  }

  getPostLinks(url: string): void {
    this.facebookService.getPostLinks(url)
      .then(res => this.youtubeService.checkIds(res))
      .then((ids) => {this.onLinksSuccess(ids)})
      .catch(res => console.log(res));
  }

  onPlayerReady(event:any): void {
    event.target.playVideo();
  }

  onPlayerStateChange(event: any): void {
    if (event.data == YT.PlayerState.PLAYING && !this.done) {
      setTimeout(this.stopVideo, 6000);
      this.done = true;
    }
  }

  stopVideo(): void {
    this.player.stopVideo();
  }

  onLoginClick(): void {
    this.facebookService.login()
      .then(res => this.onLoginSuccess(res))
      .catch(res => console.log(res));
  }

  onLinksSuccess(data: any): void {
    this.videos = data;
    console.log(this.videos)
    // this.ids.push(id) here
    this.player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: this.videos[this.currentVideoPos].id,
      playerVars: { 'autoplay': 1 },
      events: {
        'onReady': this.onPlayerReady,
        'onStateChange': (e: any) => {
          if (e.data == 0) {
            this.player.loadVideoById(this.videos[++this.currentVideoPos].id)
          }
        },
        //  'onStateChange': this.onPlayerStateChange,
        'onError': (event: any) => { console.log(event) }
      }
    });
  }

  onLoginSuccess(res: any): void {
    this.isFacebookLoggedIn = true;
    this.getPostLinks('/1741337529467978/feed') // use this.link query Params here
  }
}
