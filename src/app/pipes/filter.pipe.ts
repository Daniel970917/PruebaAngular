import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any): any {
    if(args === '' || args.length < 2)return value;
    const resultEmpleados = [];
    for(const row of value){
      if (row.Correo.toLowerCase().indexOf(args.toLowerCase()) > -1){
        resultEmpleados.push(row); 
      };
    };
    return resultEmpleados;
  }

}
