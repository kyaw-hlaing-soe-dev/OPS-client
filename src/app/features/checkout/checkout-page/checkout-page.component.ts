import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { delay, of } from 'rxjs';

import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CurrencyPipe, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
})
export class CheckoutPageComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  readonly cartService = inject(CartService);

  readonly isSubmitting = signal(false);
  readonly submissionMessage = signal<string | null>(null);

  readonly checkoutForm = this.formBuilder.group({
    customerName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', [Validators.required, Validators.minLength(2)]],
    postalCode: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 -]{3,10}$/)]],
  });

  submitCheckout(): void {
    this.submissionMessage.set(null);

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    of(true)
      .pipe(delay(300), takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.submissionMessage.set(
            'Your details are valid for this frontend demo. No live order was submitted because the Order Service contract is not available yet.',
          );
        },
        error: () => {
          this.isSubmitting.set(false);
          this.submissionMessage.set(
            'Unable to complete the checkout demo. Please try again.',
          );
        },
      });
  }

  hasError(controlName: keyof typeof this.checkoutForm.controls): boolean {
    const control = this.checkoutForm.controls[controlName];
    return control.invalid && control.touched;
  }
}
