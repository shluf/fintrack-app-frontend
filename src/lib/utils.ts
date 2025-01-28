import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = () => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

export function formatRupiah(
  angka: number,
  options: { abbreviate?: boolean } = {}
): string {
  const { abbreviate = false } = options;

  if (abbreviate) {
    const thresholds = [
      { divisor: 1e12, suffix: 'T' }, // Triliun
      { divisor: 1e9, suffix: 'M' },  // Miliar
      { divisor: 1e6, suffix: 'Jt' }, // Juta
      { divisor: 1e3, suffix: 'K' }   // Ribu
    ];

    const threshold = thresholds.find(t => Math.abs(angka) >= t.divisor);
    
    if (threshold) {
      const formatted = new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 1
      }).format(angka / threshold.divisor);
      
      return `Rp${formatted}${threshold.suffix}`;
    }
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(angka);
}