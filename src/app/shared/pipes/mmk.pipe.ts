import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mmk',
  standalone: true,
})
export class MmkPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    const safeValue = Number(value ?? 0);

    if (!Number.isFinite(safeValue)) {
      return 'MMK 0';
    }

    const amount = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(safeValue);

    return `MMK ${amount}`;
  }
}
