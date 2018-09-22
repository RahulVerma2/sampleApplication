import { Component, OnInit } from '@angular/core';
import {ContentServiceService} from '../../service/content-service.service'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],

})
export class ContentComponent implements OnInit {
  
  vegetableList = [];
  cartList =[];

  constructor(private contentServiceService: ContentServiceService) { }

  ngOnInit() {
    if(this.contentServiceService.getVegetableList().length == 0){
      this.contentServiceService.getItemList().subscribe( res =>{
        // this.vegetableList = res;
        this.contentServiceService.setItemList(this.vegetableList);
      });
    }else{
      this.vegetableList = this.contentServiceService.getVegetableList();
    }
    
    this.cartList = this.contentServiceService.getCartList();

    // this.contentServiceService.newVegetableSubject.subscribe(
    //   data => {
    //     debugger;
    //     var index = this.cartList.indexOf(data);
    //     if(index>-1){
    //       this.cartList[index] = data;
    //     }
    //     else{
    //       this.cartList = [data, ...this.cartList];
    //     }
        
    //   }
    // )
  }
  
  addToCart(vegetable){
    if(vegetable.itemQty){
      this.contentServiceService.addToCart(vegetable);
    }
    
  }

  removeItemFromCartList(vegetable){
    this.cartList.splice(this.cartList.indexOf(vegetable),1);
    this.contentServiceService.removeFromCart(vegetable);
  }

 
}
