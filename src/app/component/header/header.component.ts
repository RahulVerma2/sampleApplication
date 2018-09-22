import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  isUserSignedIn : boolean;
  userDetail : object ={};
  displayName: string;
  ngOnInit() {
    this.checkIfUserLoggedin();
  }

  checkIfUserLoggedin(){
    var userDetail = JSON.parse(localStorage.getItem("userDetail"));
    if(userDetail == null){
      this.isUserSignedIn = false;
    }
    else{
      this.isUserSignedIn = true;
      this.userDetail = userDetail;
      this.displayName = userDetail.name.split(" ")[0];
    }
  }

  signOut(){
    localStorage.removeItem("userDetail");
    window.location.reload();
  }

}
