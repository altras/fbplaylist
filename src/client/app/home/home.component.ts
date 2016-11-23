import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'
import { FacebookService } from '../services/facebook.service'

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  providers: [FacebookService]
})

export class HomeComponent {

  link: string = '';
  invalid: boolean = false;

  constructor(private router: Router, private facebookService: FacebookService) {}

  handleSubmit(): boolean {
    if (this.facebookService.checkUrl(this.link)) {
      let navigationExtras: NavigationExtras = {
        queryParams: { 'link': this.link }
      };
      this.router.navigate(['/playlist'], navigationExtras)
    } else {
      this.invalid = true
    }
    return false;
  }
}
