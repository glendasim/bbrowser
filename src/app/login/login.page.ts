import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// Import Auth Service
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  myForm: FormGroup;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder
    )
     {
       this.myForm =formBuilder.group({
         'email': '',
         'password':''
       });
      }
      ngOnInit() {
      }
    
      //Use the login function in the auth service 
      login(){
        this.authService.login(this.myForm.value.email, this.myForm.value.password);
      }
    
      //Use the register function in the auth service
      register(){
        this.authService.register(this.myForm.value.email, this.myForm.value.password);
      }
    
    }
    