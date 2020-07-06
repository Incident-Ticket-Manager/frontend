import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
      case 'Open':
        return 'Ouvert';
      case 'Resolved':
        return 'Résolu';
      case 'In progress':
        return 'En cours de résolution';
      default:
        return 'Inconnu';
    }
  }

}
