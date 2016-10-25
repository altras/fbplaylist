import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FacebookService } from '../facebook.service';




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

  constructor(private router: Router, private route: ActivatedRoute, private facebookService: FacebookService) {
    facebookService.init();
  }

  ngOnInit() {
    let queryParams: any = this.route.queryParams;
    this.link = queryParams.getValue().link
    this.facebookService.getLoginStatus().then(res => this.onLoginStatus(res))
  }

  onLoginClick() : void {
    this.facebookService.login('/1741337529467978/feed')
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
    console.log(res)
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
