import { Component } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  template: '<div class="error-message" role="alert">Something went wrong.</div>',
})
export class ErrorMessageComponent {}
