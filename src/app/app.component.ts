import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-nav-bar></app-nav-bar>
  <router-outlet></router-outlet>
  `,
  styles: [``]
})
export class AppComponent {
  title = 'random-fact-dashboard';
}
