import { Component } from '@angular/core';



@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  scroll(element: HTMLElement) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
