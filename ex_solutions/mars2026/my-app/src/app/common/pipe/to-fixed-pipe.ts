import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFixed',
})
export class ToFixedPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
     let val : number = <number> value;
     let n : number = <number> args[0] || 1;
    return val.toFixed(n);
  }

}

/*
à utiliser via {{ttc | toFixed:2}}
et avec imports: [ ToFixedPipe, ...],
*/
