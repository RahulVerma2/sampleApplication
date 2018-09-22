import { Component, OnInit } from '@angular/core';
import {ContentServiceService} from '../../service/content-service.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
  
})
export class CartComponent implements OnInit {

  cartList= [];
  totalAmount = 0;

  constructor(private contentServiceService: ContentServiceService, private router: Router) { }

  proceedToCheckout(){
    if(this.totalAmount){
      var currentUser = this.contentServiceService.proceedToCheckout();
      if(currentUser){
        this.router.navigateByUrl('/orderConfirmation');
      }
      else{
        this.router.navigateByUrl('/login');
      }
    }
    
  }
  
  ngOnInit() {
    this.cartList = this.contentServiceService.getCartList();
    this.totalAmount = this.contentServiceService.getCartTotal();
    // this.contentServiceService.newVegetableSubject.subscribe(
      
    //   data => {
    //     if(data.action ==="add"){
    //       this.cartList = [data, ...this.cartList];
    //     }
    //     else if(data.action ==="remove"){

    //       //We will remove the vegetable
          
    //     }


    //   }
    // )
  }

  
}
