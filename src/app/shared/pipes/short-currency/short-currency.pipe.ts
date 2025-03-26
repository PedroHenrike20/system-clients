import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortCurrency'
})
export class ShortCurrencyPipe implements PipeTransform {

  transform(value: number, digits: number = 1): string {
    if (value < 1000) {
      return value.toString();
    }

    const units = ['k', 'M', 'B', 'T']; 
    const order = Math.floor(Math.log10(value) / 3); 

    const scaledValue = value / Math.pow(1000, order); 
    const scaledValueFormatted = scaledValue.toFixed(digits);

    return `R$${scaledValueFormatted}${units[order - 1]}`;
  }

}
