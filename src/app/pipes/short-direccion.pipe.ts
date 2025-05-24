import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDireccion'
})
export class ShortDireccionPipe implements PipeTransform {

  transform(value:string, size: number): string {
    if(value.length<=size){
      return value;
    }
    return value.substring(0,size).concat("...");
  }

}
