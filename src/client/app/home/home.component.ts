import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
})

export class HomeComponent {

  link: string = '';

  constructor(private router: Router) {}

  handleSubmit(): boolean {
    let navigationExtras: NavigationExtras = {
      queryParams: { 'link': this.link }
    };
    this.router.navigate(['/playlist'], navigationExtras)
    return false;
  }

}
