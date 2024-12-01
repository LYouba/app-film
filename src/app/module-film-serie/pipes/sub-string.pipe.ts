import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subString'
})
export class SubStringPipe implements PipeTransform {

  transform(value: String, separator: String): String {
    if(!value)
      value = "Pas de titre";

    if (value.length<20) {
      return value
    }
    
    return value.slice(0, 20).concat('...');
  }

}
