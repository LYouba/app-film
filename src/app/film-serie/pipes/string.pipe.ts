import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'string'
})
export class StringPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return (value as string).toString();
  }

}
