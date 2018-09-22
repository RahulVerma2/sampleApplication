import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
 


@Injectable()
export class ContentServiceService {


  public latestOrderId;  
  // public newVegetableSubject = new Subject<any>();
  private cartList = [];
  private vegetableList = [];

  constructor(private http: Http) { 
    console.log("service");
    
  }

 
  
  // Get the list of cart.
  getCartList(){
    return this.cartList;
  }

  setItemList(vegetableList){
    this.vegetableList = vegetableList;
  }

  getVegetableList(){
    return this.vegetableList;
  
  }

  getCartTotal(){
    let totalAmount = 0;
    this.cartList.forEach(element => {
      totalAmount = totalAmount + (element.itemQty * element.itemPrice);
    });
    return totalAmount;
  }

  proceedToCheckout(){
    var userDetail = JSON.parse(localStorage.getItem("userDetail"));
    if(userDetail == null){
      return false;
    }
    else{
      return userDetail;
    }
  }

 

  // Add items to cart.
  addToCart(vegetable){
    debugger;
    // this.newVegetableSubject.next(vegetable);
    var index = this.cartList.indexOf(vegetable);
    if(index>-1){
      this.cartList[index] = vegetable;
    }
    else{
      this.cartList.push(vegetable);
    }
    
  }

  // Add items to cart.
  removeFromCart(vegetable){
    if(this.cartList.indexOf(vegetable)>-1){
      this.cartList.splice(this.cartList.indexOf(vegetable),1);
    }
   
  }

  // Get the item list from backend.
  getItemList(){
    return this.http.get('http://localhost:3000/getItems');
  }
}
