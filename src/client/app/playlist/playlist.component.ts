import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FacebookService } from '../facebook.service';


declare var YT: any;

/**
* This class represents the lazy loaded PlaylistComponent.
*/
@Component({
  moduleId: module.id,
  selector: 'sd-playlist',
  templateUrl: 'playlist.component.html',
  styleUrls: ['playlist.component.css'],
  providers: [FacebookService]
})
export class PlaylistComponent implements OnInit {

  link: string;
  isFacebookLoggedIn: boolean = true;
  player : any;

  constructor(private router: Router, private route: ActivatedRoute, private facebookService: FacebookService) {
    facebookService.init();
  }

  ngOnInit() {
    let queryParams: any = this.route.queryParams;
    this.link = queryParams.getValue().link
    this.facebookService.getLoginStatus().then(res => this.onLoginStatus(res))
  }

  onPlayerReady(event:any) : void {
    event.target.playVideo();
  }

  done : boolean = false;
  onPlayerStateChange(event : any) : void {
        if (event.data == YT.PlayerState.PLAYING && !this.done) {
          setTimeout(this.stopVideo, 6000);
          this.done = true;
        }
  }

  stopVideo() : void {
        this.player.stopVideo();
  }

  onLoginClick() : void {
    this.facebookService.login()
    .then(res => this.onLoginSuccess(res)).catch(res => this.onLoginError(res));
  }

  onLoginStatus(res: any) : void {
    if(res.status === 'connected') {
      this.facebookService.getPostLinks('/1741337529467978/feed')
      .then(res => this.onLinksSuccess(res)).catch(res => this.onLinksError(res));
    } else {
      this.isFacebookLoggedIn = false;
    }
  }

  onLinksSuccess(res: any) : void {
    var ids: any = res.join(",");
    console.log(ids)
    var resultLinks : any;
       this.player = new YT.Player('player', {
             height: '390',
             width: '640',
             playerVars: {playlist: res[0] + res[1]},
             enablejsapi: 1, 
             events: {
               'onReady': this.onPlayerReady,
              //  'onStateChange': this.onPlayerStateChange,
               'onError' : (event : any) => {console.log(event)}
             }
           });

  }

getYoutubeId(theLink:string):string {
  var regexp = new RegExp(/https:\/\/(?:www\.)?youtube.*watch\?v=([a-zA-Z0-9\-_]+)/)
  if (regexp.test(theLink)) {
    return theLink.match(regexp)[1]
  }
  return "WlBiLNN1NhQ";
}

  onLinksError(res: any) : void {
    console.log(res)
  }

  onLoginSuccess(res: any) : void {
    console.log(res)
    this.isFacebookLoggedIn = true;
    this.facebookService.getPostLinks('/1741337529467978/feed')
    .then(res => this.onLinksSuccess(res)).catch(res => this.onLinksError(res));
  }

  onLoginError(res: any) : void {
    console.log(res)
  }
}
