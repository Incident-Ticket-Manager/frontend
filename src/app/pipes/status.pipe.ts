import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'Open':
        return 'Open';
      case 'Resolved':
        return 'Resolved';
      case 'In progress':
        return 'In progress';
      default:
        return 'Inconnu';
    }
  }

}
