import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  }

}
