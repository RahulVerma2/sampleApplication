import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
 
import {Router} from '@angular/router'; 
import { FormControl, Validators, FormGroup} from '@angular/forms'

//Validator functions
function positiveNumberValidator(control: FormControl) {
  let num = parseInt(control.value);
  if(num < 0){
    return {
      notPositiveNumber : {}
    }
  }

  var newNum = control.value.replace(/[^0-9 ]/g, '');
  if(newNum != control.value){
    return {
      notPositiveNumber : {}
    }
  }
  return null;
}

function nonZeroValidator(control: FormControl) { 
  let num = control.value;
  if(parseInt(num) == 0){
    return {
      nonZeroError : {}
    }
  }
  return null;
}

function phoneNumberValidator(control: FormControl) {
  return null;
}

function emailDomainValidator(control: FormControl) { 
  let email = control.value; 
  if (email && email.indexOf("@") != -1) { 
    if(email.indexOf('.') == -1){
      return{
        emailDomain: {
          
        }
      }
    }
    else{
      let [_, domain] = email.split("@");
      if (domain.indexOf('.') == -1) { 
        return {
          emailDomain: {
            parsedDomain: domain
          }
        }
      }
      else{
        let [_, extension] = email.split(".");
        if(extension.length === 0){
          return {
            noExtension: {
              
            }
          }
        }
      }
    }
     
    
  }

  return null; 
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerDetail: any;
  name: FormControl;
  phone: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl
  errorMsg = "";
  successMsg = "";
  showRegister = true;
  showOTP = false;
  showSuccess = false;
  otp:string;
  registerForm : FormGroup;
  constructor(private http: Http, private router: Router) { }

  ngOnInit() {
    this.registerDetail = {};
    this.createFormControl();
    this.createFormGroup();
  }

  //Function to create form and bind element to it.
  createFormGroup(){
    this.registerForm = new FormGroup({
      name : this.name,
      phone : this.phone,
      email : this.email,
      password :  this.password,
      confirmPassword : this.confirmPassword
    });
  }

  createFormControl(){

    
      this.name = new FormControl('', Validators.required),
      this.password = new FormControl('', Validators.required),
      this.confirmPassword = new FormControl('', Validators.required),
      this.phone = new FormControl('',[
        Validators.required,
        positiveNumberValidator,
        nonZeroValidator,
        phoneNumberValidator
      ]),
      this.email = new FormControl('',[
        Validators.required, 
        Validators.pattern("[^ @]*@[^ @]*"),
        emailDomainValidator
      ])
     
  }


  confirmOTP(){
    
    this.confirmOtpFromServer(this.otp).subscribe(response => {
      if(response["msgCode"] === 200){
        this.register();
        //this.successMsg = ""
      }
      else{
        this.errorMsg = response["msg"];
      }
    });
  }

  // Sending Message to server to generate OTP.
  confirmOtpFromServer(otp){
    var registerDetail = JSON.parse(localStorage.getItem("tempUserDetail"));
    const obj = {
      otp: otp,
      email: registerDetail.email,
      phone: registerDetail.phone,
    };
    return this.http.post('http://localhost:3000/confirmOTP', obj);
  }




  //Event handler for register button.
  generateOTP(){
    if(this.registerDetail.password != this.registerDetail.confirmPassword){
      this.errorMsg = "Password and Confirm Password doesnot match."
      return false;
    }
    this.showRegister = false;
    this.showOTP = true;
    this.createOtp(this.registerDetail).subscribe(response => {
      if(response["msgCode"] == 200){
        this.successMsg = response["msg"];
      }
      else{
        this.errorMsg = response["msg"];
      }
    });
  }
  
  // Sending Message to server to generate OTP.
  createOtp(registerDetail){
    localStorage.setItem("tempUserDetail",JSON.stringify(registerDetail));
    const obj = {
      name: registerDetail.name,
      email: registerDetail.email,
      phone: registerDetail.phone,
    };
    return this.http.post('http://localhost:3000/generateOTP', obj);
  }




  register(){
    this.signUp().subscribe(response => {
      if(response["msgCode"] === 200){
        this.showOTP = false;
        this.showSuccess = true;
        this.successMsg = response["msg"];
        this.errorMsg = "";
        localStorage.removeItem("tempUserDetail");
      }
      else{
        this.errorMsg = response["msg"];
      }
      
    });
   }

  // sending detail to server to register User.
  signUp(){
    var registerDetail = JSON.parse(localStorage.getItem("tempUserDetail"));
    const obj = {
      name: registerDetail.name,
      email: registerDetail.email,
      phone: registerDetail.phone,
      password: registerDetail.password
    };

    return this.http.post('http://localhost:3000/register', obj);
      
  } 

}
