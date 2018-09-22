import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any, orderby:string, asc:string): any {
    if (!orderby || orderby.trim() == ""){
      return value;
    } 

    if(asc === "desc"){
      let length = value.length;
      for (var i = (length - 1); i >= 0; i--) {
        //Number of passes
        for (var j = (length - i); j > 0; j--) {
          //Compare the adjacent positions
          if(value[j] && value[j - 1]){
            if (value[j][orderby] >  value[j - 1][orderby]) {
              //Swap the numbers
              var tmp = value[j];
              value[j] = value[j - 1];
              value[j - 1] = tmp;
            }
          }
          
        }
      }
      return value;
    }
    else{
      let length = value.length;
      for (var i = 0; i < length; i++) {
        //Number of passes
        for (var j = i+1; j < length; j++) {
          //Compare the adjacent positions
          if(value[i] && value[j]){
            if (value[i][orderby] > value[j][orderby]) {
              //Swap the numbers
              var tmp = value[j];
              value[j] = value[j - 1];
              value[j - 1] = tmp;
            }
          }
          
        }
      }
      return value;
     
    }
    
    
  }

}
