import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>

    <div class="container-fluid mt-2">
      <app-alert></app-alert>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
}
