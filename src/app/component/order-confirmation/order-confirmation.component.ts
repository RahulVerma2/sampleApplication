import { Component, OnInit } from '@angular/core';
import {ContentServiceService} from '../../service/content-service.service'
import { Http } from '@angular/http';
import {Router} from '@angular/router';
import { AppSettings } from '../../app.config';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  addressDetail = {
    "city" : "Hyderabad",
    "state" : "Telangana"
  };

  areaList : Array<string>;


  constructor(private contentServiceService: ContentServiceService, private http: Http, private router: Router) { }

  ngOnInit() {
    this.areaList = AppSettings.areaNameList;
  }

  placeOrder(){

    var userDetail = JSON.parse(localStorage.getItem("userDetail"));
    userDetail.itemList = this.contentServiceService.getCartList();
    userDetail.address = [];
    userDetail.address.push(this.addressDetail);
    this.placeorder2(userDetail).subscribe(response => {
      if(response["msgCode"] == 200){
        this.contentServiceService.latestOrderId = response["orderId"];
        this.router.navigateByUrl('trackOrder');
      }
    })
    
  }

  placeorder2(userDetail){
    var obj = {
      name : userDetail.name,
      phone : userDetail.phone,
      address : userDetail.address,
      itemList : userDetail.itemList,
      email : userDetail.email,
    }

     return this.http.post('http://localhost:3000/placeOrder', obj);

  }

}
