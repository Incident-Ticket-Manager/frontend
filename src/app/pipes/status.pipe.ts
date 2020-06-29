import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'Open':
        return 'Ouvert';
      case 'Close':
        return 'Fermé';
      default:
        return 'Inconnu';
    }
  }

}
