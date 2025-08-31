import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time',
    standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const minute = Math.round(((value as number) % 3600) / 60) ;

    const heure = ((value as number) - ((value as number) % 3600))/ 3600;
    return `${heure} ${heure > 1 ? 'Heures' : 'Heure'} ${minute} ${minute > 1 ? 'Minutes' : 'Minute'}`;
  }

}
