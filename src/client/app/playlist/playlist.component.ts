import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare var FB: any;

/**
 * This class represents the lazy loaded PlaylistComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-playlist',
  templateUrl: 'playlist.component.html',
  styleUrls: ['playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  link: string;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    let queryParams: any = this.route.queryParams;
    this.link = queryParams.getValue().link
    FB.init({
      appId: '1673818472934251',
      xfbml: true,
      cookie: true,
      version: 'v2.7'
    })
    FB.login(function(response: any) {
      if (response.authResponse) {
       console.log('Welcome!  Fetching your information.... ');
       FB.api('/me', function(res: any) {
         console.log('Good to see you, ' + res.name + '.');
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
    });
    // FB.api('/1741337529467978/feed', 'GET', {"fields":"link"},
    //   function(res: any) {
    //     console.log(res)
    //   }
    // );
  }

}
