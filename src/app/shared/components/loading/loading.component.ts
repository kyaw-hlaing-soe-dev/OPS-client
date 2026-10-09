import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  template: '<div class="loading" role="status" aria-live="polite">Loading...</div>',
})
export class LoadingComponent {}
