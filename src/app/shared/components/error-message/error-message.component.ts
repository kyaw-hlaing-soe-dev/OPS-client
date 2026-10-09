import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  template: '<div class="error-message" role="alert">{{ message() }}</div>',
})
export class ErrorMessageComponent {
  readonly message = input('Something went wrong.');
}
