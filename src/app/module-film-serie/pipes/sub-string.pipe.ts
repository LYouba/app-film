import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subString'
})
export class SubStringPipe implements PipeTransform {

  transform(value: String, lengthMax:number): String {
    if(!value)
      value = "Pas de titre";

    if (value.length<lengthMax) {
      return value
    }
    return value.slice(0, lengthMax).concat('...');
  }
}
