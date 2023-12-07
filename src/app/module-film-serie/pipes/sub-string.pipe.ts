import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subString'
})
export class SubStringPipe implements PipeTransform {

  transform(value: String, separator: String): String {
    if (value.length<30) {
      return value
    }
    if (value.includes(':')) {
     return value.split(`${separator}`)[0]
    }
    return value.slice(0, 30).concat('...');
  }

}
