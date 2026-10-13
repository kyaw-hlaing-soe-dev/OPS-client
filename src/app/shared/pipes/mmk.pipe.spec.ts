import { describe, expect, it } from 'vitest';

import { MmkPipe } from './mmk.pipe';

describe('MmkPipe', () => {
  it('formats MMK as a whole-number amount', () => {
    expect(new MmkPipe().transform(123456)).toBe('MMK 123,456');
  });

  it('returns a safe zero value for invalid input', () => {
    expect(new MmkPipe().transform(Number.NaN)).toBe('MMK 0');
  });
});
