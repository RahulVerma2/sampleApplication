import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
 
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : string;
  password:string;
  errorMsg ="";
  constructor(private http: Http, private router:Router) { }

  ngOnInit() {
  }

 signIn(){
  this.login(this.username, this.password).subscribe(response => {
    if(response["msgCode"] === 200){
      localStorage.setItem("userDetail",JSON.stringify(response["msg"]));
      this.errorMsg = "";
      this.router.navigateByUrl("content");
      window.location.reload();
    }
    else{
      this.errorMsg = response["msg"]
    }
    
  });
 }

  login(username: string, password: string){
    const loginObj = {
      username: username,
      password: password
    };

    return this.http.post('http://localhost:3000/login', loginObj);
      
  } 

}
