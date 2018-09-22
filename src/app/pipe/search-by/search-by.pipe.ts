import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchBy'
})
export class SearchByPipe implements PipeTransform {

  transform(value: any, fieldName:string, searchby:string): any {
    
    if (!searchby || searchby.trim() == ""){
      return value;
    } 
    else{
      let length = value.length;
      let newList = [];
      for(var i=0; i<length;i++){
        if(value[i][fieldName].toLowerCase().indexOf(searchby.toLowerCase()) != -1){
          newList.push(value[i]);
        }
      }
      return newList; 
    }

    

  }

}
